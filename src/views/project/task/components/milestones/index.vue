<template>
  <div class="task-milestone">
    <div class="task-milestone-header">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="15">
          <el-button class="new-task-milestone" @click="handleCreateMilestone" type="success" icon="plus" size="small">创建里程碑</el-button>
        </el-col>
        <el-col :span="8">
          <div class="milestone-button-group">
            <el-button-group>
              <el-button class="filter-item" @click="handleLable" type="success" icon="lable" size="small" plain>
                <icon name="bookmark"></icon>标签
              </el-button>
              <el-button class="filter-item" @click="handleMilestone" type="success" size="small" plain>
                <icon name="flag"></icon>里程碑
              </el-button>
            </el-button-group>
            <el-input @keyup.enter.native="handleMilestoneFilter" class="filter-item" style="width: 150px;" placeholder="标签" size="small" v-model="listQuery.name"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleMilestoneFilter" size="small">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="task-milestone-new" v-show="showCreateTable">
      <el-form :inline="true" :form="milestoneForm" :rules="rules" ref="form" label-position="right">
        <el-form-item label="标题" prop="name">
          <el-input v-model="milestoneForm.name" placeholder="输入里程碑名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="content">
          <el-input v-model="milestoneForm.content" placeholder="添加描述信息（可选）" size="small"></el-input>
        </el-form-item>
        <el-form-item label="截止时间" prop="deadlineUnix">
          <el-date-picker v-model="milestoneForm.deadlineUnix" type="date" size="small" placeholder="选择截至日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="danger" @click="cancle" size="small" plain>取消</el-button>
          <el-button v-if="milestoneForm.id" type="danger" @click="modifyMilestone" size="small">修改</el-button>
          <el-button v-else type="success" @click="createMilestone" size="small">创建</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="task-milestone-list">
      <el-table :data="milestoneHeader" v-loading.body="listLoading" :show-header="false" class="file-table-header">
        <el-table-column align="left">
          <template scope="scope">
            <span v-show="scope" style="font-size: 13px;">
              <a :style="closedClass" @click="handleOpened">
                <icon name="fa"></icon>
                <strong>进行中</strong>
              </a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a :style="openedClass" @click="handleClosed">
                <icon name="check"></icon>
                <strong>已完成</strong>
              </a>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="milestoneList" v-loading.body="listLoading" :show-header="false">
        <el-table-column align="left">
          <template scope="scope">
            <div class="milestone-container">
              <router-link to="/">
                <span>{{scope.row.name}}</span>
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <span class="milestone-description">{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <span class="milestone-description">
              <icon name="calendar"></icon>截止 {{timestamp2Time(scope.row.deadlineUnix, "{y}-{m}-{d}")}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <router-link to="/">
              <span class="milestone-number">{{scope.row.numIssues}}个问题/{{scope.row.numClosedIssues}}已解决</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="right" width="200">
          <template scope="scope">
            <!-- 注意这有一个权限的设置 -->
            <div v-if="userId == scope.row.crtUser">
              <el-button type="primary" @click="handleMilestoneEdit(scope.row)" size="small" plain>修改</el-button>
              <el-button type="danger" v-if="scope.row.completeness === 0" @click="handleMilestoneClose(scope.row)" size="small" plain>关闭</el-button>
              <el-button type="danger" v-if="scope.row.completeness === 1" @click="handleMilestoneOpen(scope.row)" size="small" plain>打开</el-button>
              <el-button type="danger" @click="handleMilestoneDelete(scope.row)" size="small" plain>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="task-milestone-footer">
      <el-row type="flex" justify="center">
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pageMilestone, allMilestone, getMilestone, addMilestone, putMilestone, delMilestone } from 'api/project/milestone/index'
import { parseTime } from 'utils/index'

export default {
  props: ['projectId', 'taskId'],
  data() {
    return {
      listLoading: false,
      milestoneHeader: [1],
      total: 0,
      listQuery: {
        completeness: 0,
        name: undefined,
        page: 1,
        limit: 10
      },
      requestType: { closed: false, currentUser: '' },
      milestoneList: [],
      showCreateTable: false,
      milestonePreview: '标签预览',
      milestoneForm: {
        taskId: undefined,
        name: undefined,
        deadlineUnix: undefined,
        content: undefined
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {}
    }
  },
  computed: {
    ...mapGetters(['userId']),
    openedClass() {
      return this.requestType.closed ? { color: '#24292e' } : { color: '#96989b' }
    },
    closedClass() {
      return this.requestType.closed ? { color: '#96989b' } : { color: '#24292e' }
    }
  },
  watch: {
    requestType: {
      handler(oldValue, newValue) {
        this.getMilestoneList()
      },
      deep: true
    }
  },
  created() {
    this.getMilestoneList()
  },
  methods: {
    handleCreateMilestone() {
      this.showCreateTable = !this.showCreateTable
      this.resetForm()
    },
    handleLable() {
      this.$router.push({ name: '问题标签' })
    },
    handleMilestone() {
      this.$router.push({ name: '里程碑' })
    },
    handleMilestoneFilter() {
      this.listLoading = true
      this.listQuery.taskId = this.taskId
      pageMilestone(this.listQuery).then(res => {
        this.listLoading = false
        this.milestoneList = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange() {
      this.listQuery.limit = val;
      this.getMilestoneList();
    },
    handleCurrentChange() {
      this.listQuery.page = val;
      this.getMilestoneList();
    },
    handleMilestoneEdit(row) {
      this.milestoneForm = row
      this.showCreateTable = true
    },
    handleMilestoneClose(row) {
      row.completeness = 1
      putMilestone(row).then(res => {
        if (res.status === 200) {
          this.getMilestoneList()
          this.showCreateTable = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleMilestoneOpen(row) {
      row.completeness = 0
      putMilestone(row).then(res => {
        if (res.status === 200) {
          this.getMilestoneList()
          this.showCreateTable = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleMilestoneDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMilestone(row.id)
          .then(res => {
            if (res.status === 200) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.milestoneList.indexOf(row)
              this.milestoneList.splice(index, 1)
            } else {
              this.$notify({
                title: '失败',
                message: '删除失败',
                type: 'error',
                duration: 2000
              })
            }

          })
      })
    },
    handleOpened() {
      this.requestType.closed = false
      this.listQuery.completeness = 0
    },
    handleClosed() {
      this.requestType.closed = true
      this.listQuery.completeness = 1
    },
    cancle() {
      this.showCreateTable = false
    },
    getMilestoneList() {
      this.listLoading = true
      this.listQuery.taskId = this.taskId
      pageMilestone(this.listQuery).then(res => {
        this.listLoading = false
        this.milestoneList = res.data.rows
        this.total = res.data.total
      })
    },
    modifyMilestone() {
      putMilestone(this.milestoneForm).then(res => {
        if (res.status === 200) {
          this.getMilestoneList()
          this.showCreateTable = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    createMilestone() {
      var date = this.milestoneForm.deadlineUnix
      this.milestoneForm.deadlineUnix = Date.parse(new Date(date))
      this.milestoneForm.taskId = this.taskId
      this.milestoneForm.numIssues = 0
      this.milestoneForm.numClosedIssues = 0
      addMilestone(this.milestoneForm).then(res => {
        if (res.status === 200) {
          this.getMilestoneList()
          this.showCreateTable = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '创建失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    resetForm() {
      this.milestoneForm = {
        taskId: this.taskId,
        name: undefined,
        deadlineUnix: undefined,
        content: undefined
      }
    },
    timestamp2Time(timestamp, cFormat) {
      return parseTime(timestamp, cFormat)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-milestone {
  &-new {
    padding: 16px;
    background-color: #ffffff;
    border-radius: 3px;
    margin: 0 30px 10px 20px;
    height: 168px;
    .el-form {
      margin-top: 20px;
    }
    .el-form-item {
      vertical-align: bottom;
    }
    .el-color-picker {
      display: table;
    }
  }
  &-header {
    margin-bottom: 16px;
    .new-task-milestone {
      margin-left: 20px;
    }

    .milestone-button-group {
      position: absolute;
      right: 18px;
      padding-right: 12px;
      .el-input {
        width: 150px;
      }
      .el-button {
        .fa-icon {
          margin: -3px 3px -2px -5px;
        }
        &:not(:last-child) {
          margin-right: 0px;
          border-right-color: #acb1b7;
        }
      }
    }
  }
  &-list {
    margin: 0 30px 10px 20px;
    .file-table-header {
      border-radius: 3px 3px 0 0;
      &.el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #f1f8ff;
      }
      .el-table__row {
        background-color: #f1f8ff;
      }
    }
  }
}
.milestone-container {
  span {
    padding: 5px 3px;
    font-size: 16px;
    font-weight: 600;
    line-height: 2;
    border-radius: 3px;
    transition: opacity 0.2s linear;
  }
}
.milestone-description {
  color: #586069;
  font-size: 12px;
}
.milestone-number {
  font-size: 12px;
  color: #586069;
}
</style>
