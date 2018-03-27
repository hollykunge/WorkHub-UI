<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="16">
          <el-button class="filter-item" v-if="allProjects_btn_add" @click="handleCreate" type="primary" icon="edit">新建项目</el-button>
        </el-col>
        <el-col :span="6">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="项目名称" v-model="listQuery.projectName"> </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{ scope.row.projectId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目名称" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="创建者" show-overflow-tooltip>
        <template scope="scope">
          <!-- 通过项目创建者id获取创建者姓名-->
          <span>{{ scope.row.projectCreatorId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.projectTimeStart }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="(计划)完成时间" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.projectPlanEnd }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="所处阶段" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.projectPhase }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="320" label="描述" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.projectDes }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">查看
          </el-button>
          <!-- <el-button v-if="allProjects_btn_edit" size="small" type="primary" @click="handleUpdate(scope.row)">编辑
          </el-button> -->
          <!-- <el-button v-if="allProjects_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button> -->
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
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="当前所处阶段" prop="projectPhase">
          <el-select class="filter-item" v-model="form.projectPhase" placeholder="请选择">
            <el-option v-for="item in  projectPhaseOptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划完成时间" prop="projectPlanEnd">
          <el-input v-model="form.projectPlanEnd" placeholder="请选择时间"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <!-- <el-select class="filter-item" v-model="form.projectTimeStart" placeholder="请选择时间">
            <el-option v-for="item in  orgtypeOptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="描述" prop="projectDes">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.projectDes"> </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">创 建</el-button>
        <el-button v-else-if="dialogStatus=='update'" type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj, all } from 'api/project/index'
import { mapGetters } from 'vuex'
export default {
  name: 'project',
  components: {
  },
  data() {
    return {
      form: {
        projectName: undefined,
        projectPhase: 'a',
        projectPlanEnd: undefined,
        projectTimeStart: undefined,
        projectDes: undefined
      },
      rules: {
        // projectName: [
        //   {
        //     required: true,
        //     message: '请输入组织名称',
        //     trigger: 'blur'
        //   },
        //   {
        //     min: 2,
        //     max: 20,
        //     message: '长度在 2 到 20 个字符',
        //     trigger: 'blur'
        //   }
        // ],
        // projectPhase: [
        //   {
        //     required: true,
        //     message: '请输入组织代码',
        //     trigger: 'blur'
        //   },
        //   {
        //     min: 1,
        //     max: 20,
        //     message: '长度在 1 到 20 个字符',
        //     trigger: 'blur'
        //   }
        // ],
        // projectPlanEnd: [
        //   {
        //     required: true,
        //     message: '请输入上级组织id'
        //   }
        // ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        projectName: undefined
      },
      projectPhaseOptions: ['a', 'b', 'c', 'd'],
      dialogFormVisible: false,
      dialogUserVisible: false,
      dialogStatus: '',
      allProjects_btn_edit: false,
      allProjects_btn_del: false,
      allProjects_btn_add: false,
      textMap: {
        update: '编辑项目',
        create: '创建项目'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList()
    this.allProjects_btn_edit = this.elements['allProjects:btn_edit']
    // this.allProjects_btn_del = this.elements['allProject:btn_del']
    this.allProjects_btn_add = this.elements['allProjects:btn_add']
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery).then(response => {  // 这个方法有问题  后台=-=
        // console.log(response.data.rows)
        // this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
      }).then(() => {
        this.getAllProject()
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
    handleUser() {
      this.dialogStatus = 'orgUser'
      this.dialogUserVisible = true
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      getObj(row.projectId)
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
      }).then(() => {
        delObj(row.projectId).then(() => {
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
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          putObj(this.form.projectId, this.form).then(() => {
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
        projectName: undefined,
        projectPhase: 1,
        projectPlanEnd: undefined,
        projectTimeStart: undefined,
        projectDes: undefined
      }
    },
    getAllProject() {
      all().then(res => {
        console.log(res)
        this.list = res
      })
    }
  }
}
</script>

