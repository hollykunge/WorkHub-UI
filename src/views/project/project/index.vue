<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="14">
          <el-button class="filter-item" v-if="allProjects_btn_add && $route.name !='我参加的'" @click="handleCreate" type="success" icon="edit">新建项目</el-button>
        </el-col>
        <el-col :span="10" style="text-align: right;">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="输入项目名称" v-model="listQuery.projectName" style="width: 300px;"> </el-input>
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
      <el-table-column align="center" label="创建者" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.crtName }}</span>
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
      <el-table-column align="center" label="所处阶段" show-overflow-tooltip>
        <template scope="scope">
          <span v-if="scope.row.projectPhase==1">需求调研阶段</span>
          <span v-if="scope.row.projectPhase==2">技术论证阶段</span>
          <span v-if="scope.row.projectPhase==3">设计阶段</span>
          <span v-if="scope.row.projectPhase==4">开发阶段</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" show-overflow-tooltip>
        <template scope="scope">
          <span>{{ scope.row.projectDes }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="allProjects_btn_edit || allProjects_btn_del" align="center" label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" v-if="allProjects_btn_edit" type="primary" @click="handleCheck(scope.row)" plain>查看
          </el-button>
          <el-button size="small" v-if="allProjects_btn_del" type="danger" @click="handleDelete(scope.row)" plain>删除
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
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" prop="projectUserId">
          <el-select v-model="form.projectUserId" filterable remote placeholder="输入姓名进行搜索" :remote-method="remoteProUserMethod" :loading="loading" style="width: 100%">
            <el-option v-for="item in userItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前所处阶段" prop="projectPhase">
          <el-select class="filter-item" v-model="form.projectPhase" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in  projectPhaseOptions" :key="item.value" :label="item.key" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划完成时间" prop="projectPlanEnd">
          <el-date-picker editable v-model="form.projectPlanEnd" type="datetime" placeholder="选择完成时间" align="center" :picker-options="pickerOptions" format="yyyy年MM月dd日HH:MM" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="projectTimeStart">
          <el-date-picker editable v-model="form.projectTimeStart" type="datetime" placeholder="选择开始时间" align="center" format="yyyy年MM月dd日HH:MM" style="width: 100%">
          </el-date-picker>
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
import { page, addObj, getObj, delObj, putObj, joinpro } from 'api/project/index'
import { page as userPage } from 'api/admin/user/index'
import { mapGetters } from 'vuex'
export default {
  name: 'project',
  components: {
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '明天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }, {
          text: '一个月后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', date)
          }
        }]
      },
      form: {
        projectName: undefined,
        projectUserId: '', // 执行者id
        projectPhase: '1',
        projectPlanEnd: undefined,
        projectTimeStart: undefined,
        projectDes: undefined
      },
      rules: {
        projectName: [
          {
            required: true,
            message: '项目名称不能为空'
          }
        ],
        projectUserId: {
          required: true,
          message: '请选择'
        },
        projectPhase: [
          {
            required: true,
            message: '请选择'
          }
        ],
        projectPlanEnd: [
          {
            required: true,
            message: '计划完成时间不能为空'
          }
        ],
        projectDes: [
          {
            required: true,
            message: '项目描述不能为空'
          }
        ],
        projectTimeStart: [
          {
            required: true,
            message: '项目完成时间不能为空'
          }
        ]
      },
      list: null,
      total: null,
      userItems: [],
      listLoading: false,
      loading: false,
      listQuery: {
        page: 1,
        limit: 10,
        projectName: undefined,
        // projectUserId: '', // 项目负责人id
        // crtUser: '', // 创建人的id
        // taskExecutorId: '', // 任务负责人的id
        // projectId: '' // 项目id
      },
      projectPhaseOptions: [{ key: '需求调研阶段', value: 1 }, { key: '技术论证阶段', value: 2 }, { key: '设计阶段', value: 3 }, { key: '开发阶段', value: 4 }],
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
    this.allProjects_btn_edit = this.elements['allProjects:btn_edit']
    this.allProjects_btn_add = this.elements['allProjects:btn_add']
    this.allProjects_btn_del = this.elements['allProjects:btn_del']
    this.getList()
  },
  computed: {
    ...mapGetters([
      'elements',
      'userId'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true
      const routeName = this.$route.name
      if (routeName === '全部项目') {
        page(this.listQuery).then(response => {
          this.total = response.data.total
          this.listLoading = false
          this.list = response.data.rows
        })
      }
      if (routeName === '我创建的') {
        this.listQuery.crtUser = this.userId
        page(this.listQuery).then(response => {
          this.total = response.data.total
          this.listLoading = false
          this.list = response.data.rows
        })
      } 
      if (routeName === '我参加的') {
        this.listQuery.currentUserId = this.userId
        joinpro(this.listQuery).then(response => {
          this.total = response.data.total
          this.listLoading = false
          this.list = response.data.rows
        })
      }     
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
    handleCheck(project) {
      this.$router.push({ name: '项目详情', params: { projectId: project.projectId }})
    },
    handleUser() {
      this.dialogStatus = 'orgUser'
      this.dialogUserVisible = true
    },
    handleCreate() {
      // this.resetTemp()
      // this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      this.$router.push({name: '创建项目'})
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
      }, () => {
        return
      })
    },
    remoteProUserMethod(query) {
      if (query !== '') {
        this.loading = true
        this.loading = false
        userPage({
          name: query
        }).then(response => {
          console.log(response)
          this.userItems = response.data.rows
          this.loading = false
        })
      } else {
        this.userItems = []
      }
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
        projectUserId: '', // 执行者id
        projectPhase: 1,
        projectPlanEnd: undefined,
        projectTimeStart: undefined,
        projectDes: undefined
      }
    },
    handleTest() {
      this.$router.push({name: '创建项目'})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-table__fixed-right {
  overflow: hidden;
}
</style>


