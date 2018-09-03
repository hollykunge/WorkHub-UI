<template>
  <div class="task-list">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="8" style="text-align: left;">
          <el-button class="filter-item" v-if="projectData_btn_add" @click="handleCreateTask" type="success" icon="plus" size="small">创建任务</el-button>
        </el-col>
        <el-col :span="16" style="text-align: right;">
          <property-select title="筛选" :properties="properties" @changed="handleTypeChanged"></property-select>
          <el-input @keyup.enter.native="handleTaskFilter" class="filter-item" style="width: 300px;" placeholder="输入任务名称" size="small" v-model="listQuery.taskName"></el-input>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleTaskFilter" size="small" plain>搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="task-list-content">
      <el-row type="flex" justify="center">
        <el-col>
          <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row empty-text="暂无任务数据" style="width: 100%">
            <el-table-column label="序号" prop="taskId" type="index" align="center" width="65"></el-table-column>
            <el-table-column label="任务名称" prop="taskName" align="center" width="250" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.task.taskName.match(/\/(\S*)(?=.git)/)[1]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="负责人" prop="taskExecutorId" align="center">
              <template scope="scope">
                <span>{{scope.row.task.taskExecutorId}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="优先级" prop="taskPriority" align="center"> -->
            <el-table-column label="优先级" prop="taskId" align="center" width="80">
              <template scope="scope">
                <el-tag v-if="scope.row.task.taskId" type="danger">高</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="计划完成时间" prop="taskPlanEnd" align="center">
              <template scope="scope">
                <span>{{timestamp2Time(scope.row.task.taskPlanEnd, "{y}-{m}-{d}")}}</span>
              </template>
            </el-table-column>
            <el-table-column label="进度" prop="taskProcess" align="center">
              <template scope="scope">
                <el-progress :percentage="scope.row.task.taskProcess * 25" :status="scope.row.taskProcess==4?'success':''"></el-progress>
              </template>
            </el-table-column>
            <el-table-column v-if="projectData_btn_edit || projectData_btn_del" align="left" label="操作" fixed="right" width="150px">
              <template scope="scope">
                <el-button v-if="scope.row.status" size="small" type="success" @click="handleCheck(scope.row)" plain>处理
                </el-button>
                <el-button v-if="projectData_btn_edit&&(!scope.row.status)" size="small" type="primary" @click="handleCheck(scope.row)" plain>查看
                </el-button>
                <el-button v-if="projectData_btn_del&&scope.row.status" size="small" type="danger" @click="handleDelete(scope.row)" plain>删除
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
  </div>
</template>

<script>
import { page, delObj as deleteTask, joinedTaskInProject } from 'api/project/task/index'
import { parseTime } from 'utils/index'
import { mapGetters } from 'vuex'
import propertySelect from 'src/views/components/propertySelect'

export default {
  props: ['projectId'],
  components: { propertySelect },
  data () {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        taskName: undefined,
        // taskProjectId: undefined,
        // taskExecutorId: undefined
      },
      list: [],
      total: null,
      listLoading: false,
      projectData_btn_edit: true,
      projectData_btn_del: true,
      projectData_btn_add: true,
      properties: [ {name: '我参加的'}, {name: '我创建的'}, {name: '全部任务'} ],
      currentPropertie: undefined
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'elements'
    ])
  },
  created () {
    // this.projectData_btn_edit = this.elements['projectData:btn_edit']
    // this.projectData_btn_add = this.elements['projectData:btn_add']
    // this.projectData_btn_del = this.elements['projectData:btn_del']
    this.currentPropertie = this.properties[0].name
    this.getTaskList(this.currentPropertie)
  },
  methods: {
    getTaskList (val) { // val:     properties的类型 *为必选值 为currentProperties
      this.listLoading = true
      this.listQuery.projectId = this.projectId

      switch (val) {
        case '我参加的':
          this.listQuery.crtUser = this.userId
          joinedTaskInProject(this.listQuery).then(res => {
            this.total = res.data.total
            this.listLoading = false
            this.list = res.data.rows
          })
          break;
        case '我创建的':
          this.listQuery.crtUser = this.userId
          page(this.listQuery).then(res => {
            this.total = res.data.total
            this.listLoading = false
            this.list = res.data.rows
          })
          break;
        case '全部任务':
          this.listQuery.crtUser = undefined
          page(this.listQuery).then(res => {
            this.$emit('taskTotalNum', res.data.total) // 获取完数据触发该事件，返回总的任务数
            this.total = res.data.total
            this.listLoading = false
            this.list = res.data.rows
          })
          break;
        default:
          break;
      }
    },
    handleCreateTask() {
      this.$router.push( {name: '创建任务', params: { projectId: this.projectId } }) 
    },
    handleTaskFilter () {
      this.getTaskList(this.currentPropertie)
    },
    handleCheck (task) {
      this.$router.push({ name: '任务详情', params: { projectId: this.projectId, taskId: task.task.taskId } })
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask(row.task.taskId).then(() => {
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
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getTaskList(this.currentPropertie)
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getTaskList(this.currentPropertie)
    },
    handleTypeChanged (val) {
      this.getTaskList(val)
      this.currentPropertie = val
    },
    timestamp2Time (timestamp, cFormat) {
      return parseTime(timestamp, cFormat)
		}

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-list {
  margin: 0 20px;
  .property-dropdown {
    margin-bottom: 8px;
    margin-right: 24px;
    vertical-align: middle;
  }
}
</style>
