<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row type="flex" :gutter="5">
        <el-col :span="10">
          <el-button class="filter-item" v-if="orgManager_btn_add" @click="handleCreate" type="primary" icon="edit">添加组织</el-button>
          <el-button class="filter-item" v-if="orgManager_btn_add" @click="handleCreate" type="primary">
            <icon-svg icon-class="27"></icon-svg> 关联用户</el-button>
        </el-col>
        <el-col :span="6" :push="6">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="部门名称" v-model="listQuery.orgname"> </el-input>
        </el-col>
        <el-col :span="4" :push="6">
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
      <el-table-column align="center" width="80" label="部门">
        <template scope="scope">
          <span>{{ scope.row.orgname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="65" label="编号">
        <template scope="scope">
          <span>{{ scope.row.orgcode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="上级部门id">
        <template scope="scope">
          <span>{{ scope.row.parentid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="65" label="类型">
        <template scope="scope">
          <span>{{ scope.row.orgtype }}</span>
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
      <el-table-column align="center" width="150" label="备注">
        <template scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150" fixed="right" v-if="orgManager_btn_edit||orgManager_btn_del">
        <template scope="scope">
          <el-button v-if="orgManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="orgManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <div v-show="!listLoading" class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </div>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input v-if="dialogStatus == 'create'" v-model="form.username" placeholder="请输入账户"></el-input>
          <el-input v-else v-model="form.username" placeholder="请输入账户" readonly></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select class="filter-item" v-model="form.sex" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from 'api/admin/organize/index'
import { mapGetters } from 'vuex'
export default {
  name: 'user',
  data() {
    return {
      form: {
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        description: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        orgname: undefined
      },
      sexOptions: ['男', '女'],
      dialogFormVisible: false,
      dialogStatus: '',
      orgManager_btn_edit: false,
      orgManager_btn_del: false,
      orgManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList()
    this.orgManager_btn_edit = this.elements['orgManager:btn_edit']
    this.orgManager_btn_del = this.elements['orgManager:btn_del']
    this.orgManager_btn_add = this.elements['orgManager:btn_add']
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
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
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
        })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then(() => {
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
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.form.password = undefined
          putObj(this.form.id, this.form).then(() => {
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
    resetTemp() {
      this.form = {
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        description: undefined
      }
    }
  }
}
</script>
