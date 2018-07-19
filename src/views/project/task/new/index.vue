// 新建任务页面
<template>
  <div class="page-new-task">
    <div class="page-new-task-header">
      <h2>创建一个新的任务</h2>
    </div>
    <div class="page-new-task-main">
      <el-form :model="form" ref="form" :rules="rules" :show-message="false">

        <div class="subheader">
          <div class="task-executor">
            <el-form-item prop="taskExecutorId">
              <p class="subheader-label">任务负责人</p>
              <el-select v-model="form.taskExecutorId" filterable remote placeholder="输入姓名进行搜索" :remote-method="remoteQueryUsers" :loading="loading" style="width: 100%">
                <el-option v-for="item in userItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </div>
          
          <div class="task-info">
            <el-form-item prop="taskProjectName">
              <p class="subheader-label">任务所属项目</p>
              <el-select v-model="form.taskProjectId" placeholder="请选择项目" @change="evalTaskProjectName(form.taskProjectId)">
                <el-option v-for="item in projectItems" :key="item.projectId" :label="item.projectName" :value="item.projectId"></el-option>
              </el-select>
              <span class="subheader-slash">/</span>
            </el-form-item>
            <el-form-item prop="taskName">
              <p class="subheader-label">任务名称</p>
              <el-input v-model="form.taskName" placeholder="请输入任务名称" style="width: 375px"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="task-issue-button">
          <el-form-item label="允许提问" prop="enableIssues" style="width: 320px">
            <el-switch v-model="form.enableIssues" on-text="是" off-text="否"></el-switch>
          </el-form-item>
          <el-form-item label="公开问题" prop="allowPublicIssues" style="width: 350px">
            <el-switch v-model="form.allowPublicIssues" on-text="是" off-text="否"></el-switch>
          </el-form-item>
        </div>

        <el-form-item label="当前所处阶段" prop="taskProcess">
          <el-select v-model="form.taskProcess" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in  taskProcessOptions" :key="item.value" :label="item.key" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划完成时间" prop="taskPlanEnd">
          <el-date-picker editable v-model="form.taskPlanEnd" type="datetime" placeholder="选择完成时间" align="center" format="yyyy年MM月dd日HH:MM" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="taskDes">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.taskDes"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="task-create-footer">
        <el-button type="primary" @click="create('form')" :disabled="createdEnabled">创建任务</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addObj, page, delObj as deleteTask } from 'api/project/task/index'
import { getObj as getProjectById, all } from 'api/project/index'
import { page as userPage, all as userAll } from 'api/admin/user/index'
import { mapGetters } from 'vuex'
export default {
  props: ['projectId'],
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        taskName: undefined,
        taskProjectId: undefined,
        taskExecutorId: undefined
      },
      list: [],
      total: null,
      projectItems: [],
      userItems: [],
      loading: false,
      listLoading: false,
      dialogFormVisible: false,
      form: {
        taskName: undefined, // 任务名称
        taskPlanEnd: undefined, // 计划结束时间
        taskProcess: undefined, // 任务进度
        taskDes: undefined, // 任务描述
        taskProjectId: undefined, // 所属项目ID
        taskProjectName: undefined, // 所属项目名称
        taskExecutorId: undefined, // 任务执行人
        taskCreatorId: undefined, // 任务创建人id
        defaultBranch: undefined, // 默认分支
        enableIssues: undefined, // 是否允许提问
        allowPublicIssues: undefined // 允许公共问题
      },
      rules: {
        taskProjectName: {
          required: true,
          message: '请选择项目'
        },
        taskName: {
          required: true,
          message: '任务名称不能为空'
        },
        taskExecutorId: {
          required: true,
          message: '任务负责人不能为空'
        },
        taskProcess: {
          required: true,
          message: '请选择'
        },
        taskPlanEnd: {
          required: true,
          message: '请选择'
        },
        taskDes: {
          required: true,
          message: '描述信息不能为空'
        },
        enableIssues: {
          required: true
        },
        allowPublicIssues: {
          required: true
        }
      },
      taskProcessOptions: [{ key: '第一阶段', value: 1 }, { key: '第二阶段', value: 2 }, { key: '第三阶段', value: 3 }, { key: '第四阶段', value: 4 }],
      projectData_btn_edit: true,
      projectData_btn_del: true,
      projectData_btn_add: true,
      createdEnabled: true
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'elements'
    ])
  },
  watch: {
    form: {
      handler() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.createdEnabled = false
          } else {
            this.createdEnabled = true
          }
        })
      },
      deep: true
    }
  },
  created() {
    this.handleCreateTask()
    this.getAllProjects()
    this.form.taskCreatorId = this.userId
    this.form.defaultBranch = 'master'
    this.form.enableIssues = true
    this.form.allowPublicIssues = true
  },
  methods: {
    getAllProjects() {
      all().then(res => {
        this.projectItems = res
      })
    },
    handleCreateTask() {
      // this.restCreateTaskForm()
      // this.form.taskProjectName = this.getProjectName()
      this.getUserItems() // 为了能正常显示默认负责人
      this.dialogFormVisible = true
    },
    handleTaskFilter() {
      this.getTaskByProIdExeId()
    },
    getProjectName() {
      getProjectById(this.projectId).then(res => {
        return res.data.projectName
      })
    },
    create(formName) {
      console.log(this.form)
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(res => {
            this.dialogFormVisible = false
            this.$router.push({ path: '/projectSys/allProjects/' + this.form.taskProjectId })
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
      // this.dialogFormVisible = false
      // this.$refs[formName].resetFields()
      this.$router.go(-1)
    },
    getTaskByProIdExeId() { // 通过项目id和负责人id获取任务
      this.listLoading = true
      this.listQuery.taskProjectId = this.projectId
      this.listQuery.taskExecutorId = this.userId
      page(this.listQuery).then(res => {
        this.$emit('taskTotalNum', res.data.total) // 获取完数据触发该事件，返回总的任务数
        this.total = res.data.total
        this.listLoading = false
        this.list = res.data.rows
      })
    },
    remoteQueryUsers(query) {
      if (query !== '') {
        this.loading = true
        this.loading = false
        userPage({
          name: query
        }).then(response => {
          this.userItems = response.data.rows
          this.loading = false
        })
      } else {
        userAll().then(res => {
          this.userItems = res
        })
      }
    },
    getUserItems() {
      userAll().then(res => {
        this.userItems = res
      })
    },
    restCreateTaskForm() { // 重置表单，同时写入项目id和负责人id
      // this.form = {
      //   taskName: undefined,
      //   taskPlanEnd: undefined,
      //   taskProcess: undefined,
      //   taskDes: undefined,
      //   taskProjectId: this.projectId,
      //   taskExecutorId: (Number)(this.userId)
      // }
    },
    evalTaskProjectName(val) {
      const selectedProject = this.projectItems.filter(item => item.projectId === val)
      this.form.taskProjectName = selectedProject[0].projectName
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.page-new-task {
  width: 700px;
  margin: 24px auto 0;
  &-header {
    margin-bottom: 24px;
    display: flex;
    border-bottom: 1px #e1e4e8 solid;
    flex-flow: row wrap;
  }
  &-main {
    .subheader {
      padding-right: 174px;
      margin-bottom: 16px;
      border-bottom: 1px #e1e4e8 solid;
      .el-form-item {
        margin-bottom: 0px;
      }
      .el-form-item__content {
        line-height: 24px;
        font-size: 14px;
      }
      .task-executor {
        .subheader-label {
        font-weight: 600;
        margin-bottom: 0px;
        margin-top: 0px;
        }
        .el-select .el-input__inner {
          cursor: pointer;
          padding-right: 0px;
          width: 150px;
        }
      }
      .task-info {
        display: inline-flex;
        width: 700px;
        margin-bottom: 24px;
        .subheader-label {
        font-weight: 600;
        margin-bottom: 0px;
        margin-top: 0px;
        }
        .subheader-slash {
          margin: 0 8px;
          font-size: 21px;
        }
        .el-select .el-input__inner {
          cursor: pointer;
          padding-right: 0px;
          width: 300px;
        }
      }
    }
    .task-issue-button {
      display: flex;
      width: 700px;
      height: 48px;
      margin-bottom: 16px;
      border-bottom: 1px #e1e4e8 solid;
    }
    .task-create-footer {
      float: right;
      margin-bottom: 32px;
    }
  }
}
</style>
