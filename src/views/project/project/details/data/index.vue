<template>
  <div class="task-list">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="16" style="text-align: left;">
          <el-button class="filter-item" v-if="projectData_btn_add" @click="handleCreateTask" type="success" icon="plus" size="small">创建任务</el-button>
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <el-input @keyup.enter.native="handleTaskFilter" class="filter-item" style="width: 300px;" placeholder="输入任务名称" size="small" v-model="listQuery.taskName"></el-input>
          <!-- </el-col>
        <el-col :span="2"> -->
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleTaskFilter" size="small" plain>搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="task-list-content">
      <el-row type="flex" justify="center">
        <el-col>
          <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row empty-text="暂无任务数据" style="width: 100%">
            <el-table-column label="序号" prop="taskId" align="center" width="65"></el-table-column>
            <el-table-column label="任务名称" prop="taskName" align="center"></el-table-column>
            <el-table-column label="负责人id" prop="taskExecutorId" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="crtTime" align="center"></el-table-column>
            <el-table-column label="计划完成时间" prop="taskPlanEnd" align="center"></el-table-column>
            <el-table-column v-if="projectData_btn_edit || projectData_btn_del" align="center" label="操作" fixed="right">
              <template scope="scope">
                <el-button v-if="projectData_btn_edit" size="small" type="primary" @click="handleCheck(scope.row)" plain>查看
                </el-button>
                <el-button v-if="projectData_btn_del" size="small" type="danger" @click="handleDelete(scope.row)" plain>删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 创建任务对话框 -->
    <el-dialog title="创建新的任务" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="任务负责人" prop="taskExecutorId">
          <el-select v-model="form.taskExecutorId" filterable remote placeholder="输入姓名进行搜索" :remote-method="remoteQueryUsers" :loading="loading" style="width: 100%">
            <el-option v-for="item in userItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前所处阶段" prop="taskProcess">
          <el-select class="filter-item" v-model="form.taskProcess" placeholder="请选择" style="width: 100%">
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
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="create('form')">创 建</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addObj, page, delObj as deleteTask } from 'api/project/task/index'
import { getObj as getProjectById } from 'api/project/index'
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

    this.getTaskByProIdExeId()
    this.getProjectName()
  },
  methods: {
    handleCreateTask() {
      this.restCreateTaskForm()
      this.form.taskProjectName = this.getProjectName()
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
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.form.taskProjectId = this.projectId
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
    handleCheck(task) {
      this.$router.push({ name: '任务详情', params: { projectId: this.projectId, taskId: task.taskId }})
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask(row.taskId).then(() => {
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
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getTaskByProIdExeId()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getTaskByProIdExeId()
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
        this.userItems = []
      }
    },
    getUserItems() {
      userAll().then(res => {
        this.userItems = res
      })
    },
    restCreateTaskForm() { // 重置表单，同时写入项目id和负责人id
      this.form = {
        taskName: undefined,
        taskPlanEnd: undefined,
        taskProcess: undefined,
        taskDes: undefined,
        taskProjectId: this.projectId,
        taskExecutorId: (Number)(this.userId)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-list {
  margin: 0 20px;
}
</style>
