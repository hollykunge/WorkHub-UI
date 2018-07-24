<template>
  <div class="task-list-page">
    <div class="task-list-page-header">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="14">
          <el-button @click="handleCreate" type="success" icon="edit">新建任务</el-button>
        </el-col>
        <el-col :span="10" style="text-align: right;">
          <el-input @keyup.enter.native="handleFilter" placeholder="输入任务名称" v-model="listQuery.taskName" style="width: 300px;"> </el-input>
          <el-button type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="task-list-page-body">
      <el-row type="flex" justify="center">
        <el-col>
          <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row empty-text="无任务数据" style="width: 100%">
            <el-table-column label="序号" type="index" align="center" width="65"></el-table-column>
            <el-table-column label="任务名称" prop="taskName" align="center"></el-table-column>
            <el-table-column label="所属项目" prop="taskProjectName" align="center"></el-table-column>
            <el-table-column label="负责人id" prop="taskExecutorId" align="center"></el-table-column>
            <el-table-column label="任务进度" prop="taskProcess" align="center">
              <template scope="scope">
                <el-progrss :text-inside="true" :stroke-width="18" :percentage="scopr.row.taskProcess*25" :status="scope.row.taskProcess==4?'success':''"></el-progrss>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="crtTime" align="center"></el-table-column>
            <el-table-column label="计划完成时间" prop="taskPlanEnd" align="center"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right">
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
  </div>
</template>

<script>
import { page, delObj, joined } from 'api/project/task/index'
import { mapGetters } from 'vuex'

export default {
  component: {},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        taskName: undefined
      },
      list: [],
      total: null,
      userItems: [],
      loading: false,
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'elements'
    ])
  },
  created() {
    this.getTaskList()
  },
  mounted() {},
  methods: {
    getTaskList() {
      this.listLoading = true
      const routerName = this.$route.name
      switch (routerName) {
        case '全部任务':
          page(this.listQuery).then(res => {
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
        case '我参加的':
          this.listQuery.currentUserId = this.userId
          joined(this.listQuery).then(res => {
            this.total = res.data.total
            this.listLoading = false
            this.list = res.data.rows
          })
          break;
        default:
          break;
      }
    },
    handleCreate() {
      this.$router.push({name: '创建任务'})
    },
    handleFilter() {
      this.getTaskList()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getTaskList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getTaskList()
    },
    handleCheck (task) {
      this.$router.push({ name: '任务详情', params: { projectId: task.taskProjectId, taskId: task.taskId } })
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.taskId).then(() => {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .task-list-page {
    padding: 20px;
    &-header {
      margin-bottom: 16px;
    }
    &-body {
      margin-bottom: 24px;
    }
  }
</style>
