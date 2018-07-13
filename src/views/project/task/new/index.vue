// 新建任务页面
<template>
  <div class="page-new-task">
    <div class="page-new-task-header">
      <h2>创建一个新的任务</h2>
    </div>
    <div class="page-new-task-main">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="任务所属项目" prop="taskProjectName">
          <el-select v-model="form.taskProjectName" placeholder="请选择项目" @change="evalTaskProjectId(form.taskProjectName)">
            <el-option v-for="item in projectItems" :key="item.projectId" :label="item.projectName" :value="item.projectName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="任务负责人" prop="taskExecutorId">
          <el-select v-model="form.taskExecutorId" filterable remote placeholder="输入姓名进行搜索" :remote-method="remoteQueryUsers" :loading="loading" style="width: 100%">
            <el-option v-for="item in userItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="create('form')">创 建</el-button>
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
        taskName: undefined,
        taskPlanEnd: undefined,
        taskProcess: undefined,
        taskDes: undefined,
        taskProjectId: undefined, // 由程序赋值
        taskProjectName: undefined, // 由程序赋值
        taskExecutorId: undefined
      },
      rules: {
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
        }
      },
      taskProcessOptions: [{ key: '第一阶段', value: 1 }, { key: '第二阶段', value: 2 }, { key: '第三阶段', value: 3 }, { key: '第四阶段', value: 4 }],
      projectData_btn_edit: true,
      projectData_btn_del: true,
      projectData_btn_add: true
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'elements'
    ])
  },
  created() {
    // this.projectData_btn_edit = this.elements['projectData:btn_edit']
    // this.projectData_btn_add = this.elements['projectData:btn_add']
    // this.projectData_btn_del = this.elements['projectData:btn_del']

    // this.getTaskByProIdExeId()
    // this.getProjectName()
    this.handleCreateTask()
    this.getAllProjects()
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
          // this.form.taskProjectId = this.projectId
          addObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.getTaskByProIdExeId()
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
    evalTaskProjectId(val) {
      const selectedProject = this.projectItems.filter(item => item.projectName === val)
      this.form.taskProjectId = selectedProject[0].projectId
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.page-new-task {
  width: 700px;
  margin: 24px auto 0;
  &-header {
    margin-bottom: 30px;
    display: flex;
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: 1px #e1e4e8 solid;
    flex-flow: row wrap;
  }
}
</style>
