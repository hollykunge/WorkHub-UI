<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="16">
          <el-button class="filter-item" v-if="orgManager_btn_add" @click="handleCreate" type="success" icon="edit">创建团队</el-button>
          <el-button class="filter-item" type="primary" @click="handleLinkUser">编辑成员</el-button>
        </el-col>
        <el-col :span="6">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="团队名称" v-model="listQuery.name"> </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="团队名称">
        <template scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="别名">
        <template scope="scope">
          <span>{{ scope.row.lowerName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="成员数量">
        <template scope="scope">
          <span>{{ scope.row.numMembers }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="任务数">
        <template scope="scope">
          <span>{{ scope.row.numTask }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="所属于项目id">
        <template scope="scope">
          <span>{{ scope.row.projectId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200" label="创建时间" show-overflow-tooltip>
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span>{{ scope.row.crtTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="创建人">
        <template scope="scope">
          <span>{{ scope.row.crtName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="创建人地址">
        <template scope="scope">
          <span>{{ scope.row.crtHost }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200" label="更新时间" show-overflow-tooltip>
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span>{{ scope.row.updTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="更新人">
        <template scope="scope">
          <span>{{ scope.row.updName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="更新人地址">
        <template scope="scope">
          <span>{{ scope.row.updHost }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="备注/描述">
        <template scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" fixed="right" v-if="orgManager_btn_edit||orgManager_btn_del||orgManager_btn_user">
        <template scope="scope">
          <el-button v-if="orgManager_btn_edit" size="small" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" size="small">关联项目</el-button>
          <el-button v-if="orgManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <div v-show="!listLoading" class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </div>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form v-if="dialogStatus!='orgUser'" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="团队名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入团队名称"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="lowerName">
          <el-input v-model="form.lowerName" placeholder="请输入别名"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else-if="dialogStatus=='update'" type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
    <link-user :show.sync="showLinkUserDialog"></link-user>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from 'api/project/team/index'
import { mapGetters } from 'vuex'
import linkUser from './components/linkUser'
export default {
  name: 'organize',
  components: {
    linkUser
  },
  data() {
    return {
      form: {
        name: undefined,
        lowerName: undefined,
        numMembers: 0,
        numTask: 0,
        projectId: undefined,
        description: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入团队名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        lowerName: [
          {
            required: true,
            message: '请输入团队别名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined
      },
      dialogFormVisible: false,
      showLinkUserDialog: false,
      dialogStatus: '',
      orgManager_btn_edit: false,
      orgManager_btn_del: false,
      orgManager_btn_add: false,
      orgManager_btn_user: false,
      textMap: {
        update: '编辑',
        create: '创建',
        orgUser: '成员管理'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList()
    this.orgManager_btn_edit = this.elements['orgManager:btn_edit']
    this.orgManager_btn_del = this.elements['orgManager:btn_del']
    this.orgManager_btn_add = this.elements['orgManager:btn_add']
    this.orgManager_btn_user = this.elements['orgManager:btn_userManager']
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    handleLinkUser() {
      this.showLinkUserDialog = true
    },
    getList() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      getObj(row.id)
        .then(response => {
          this.form = response.data
          this.dialogFormVisible = true
          this.dialogStatus = 'update'
        })
    },
    handleDelete(row) {
      this.$confirm('此操作将该团队永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row) // 删除列表中对应的项
          this.list.splice(index, 1)
        })
      })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      if (this.dialogStatus === 'orgUser') {
        this.dialogUserVisible = false
        return
      }
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.form = {
        name: undefined,
        lowerName: undefined,
        numMembers: 0,
        numTask: 0,
        projectId: undefined,
        description: undefined
      }
    }
  }
}
</script>
