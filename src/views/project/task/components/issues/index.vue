<template>
  <div class="task-issue">
    <div class="task-issue-header">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="15">
          <el-button class="new-task-issue" @click="handleCreateIssues" type="success" icon="plus" size="small">新建问题</el-button>
        </el-col>
        <el-col :span="8">
          <div class="issue-button-group">
            <el-button-group>
              <el-button class="filter-item" @click="handleFilterLable" type="success" icon="lable" size="small" plain>
                <icon name="bookmark"></icon>标签
              </el-button>
              <el-button class="filter-item" @click="handleFilterMilestone" type="success" size="small" plain>
                <icon name="flag"></icon>里程碑
              </el-button>
            </el-button-group>
            <el-input @keyup.enter.native="handleIssuesFilter" v-model="listQuery.name" class="filter-item" style="width: 150px;" placeholder="问题关键字" size="small"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleIssuesFilter" size="small">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="issues-list">
      <el-table :data="issueHeader" v-loading.body="listLoading" :show-header="false" class="file-table-header" empty-text="无更新记录">
        <el-table-column align="left">
          <template scope="scope">
            <span v-show="scope" style="font-size: 13px;">
              <a :style="closedClass" @click="handleOpened">
                <icon name="question-circle-o" style="font-size: 16px;"></icon>
                <strong>未解决</strong>
              </a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a :style="openedClass" @click="handleClosed">
                <icon name="check"></icon>
                <strong>已解决</strong>
              </a>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template scope="scope">
            <span v-show="scope" style="color: #7b7373; font-size: 13px;">
              <property-select title="用户" :properties="users" @changed="handleUserChanged"></property-select>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="issueList" v-loading.body="listLoading" :show-header="false">
        <el-table-column align="left">
          <template scope="scope">
            <div class="pull-request-description">
              <icon name="question-circle-o" style="color: #13ce66; margin-top: 2px; font-size: 17px;"></icon>
              <div class="pull-request-description-title">
                <h3 @click="handleCheckIssue(scope.row)">
                  <a>{{scope.row.name}}</a>
                </h3>
                <span>#{{scope.row.issueIndex}} {{scope.row.crtName}}在{{timestamp2Text(scope.row.crtTime)}}提出</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template scope="scope">
            <span v-if="scope.row.numComments!=0" style="color: #7b7373;">
              <a>
                <icon name="comment-o"></icon>
                {{scope.row.numComments}}
              </a>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="task-issue-footer">
      <el-row type="flex" justify="center">
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import propertySelect from 'src/views/components/propertySelect'
import { getIssue, addIssue, putIssue, delIssue, allIssue, pageIssue } from 'api/project/issue/index'
import { formatTime } from 'utils/index'

export default {
  props: ['projectId', 'taskId'],
  components: { propertySelect },
  data() {
    return {
      searchKeys: '',
      // 通过用户搜索
      // fliterUserText: '',
      // filteredUser: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      users: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      // 对请求进行筛选，修改筛选条件时改变相应对象的值
      requestType: { closed: false, currentUser: '' },
      issueHeader: [{ name: 'jihainan', hashCode: 'b2a5e260d4', comment: '修改表头样式', time: '一个小时之前' }],
      issueList: [],
      listLoading: false,
      listQuery: {
        name: undefined,
        isClosed: 0,
        limit: 10,
        page: 1,
      },
      total: 0
    }
  },
  watch: {
    // 监听requestType，当变化时根据requestType的值重新获取request列表
    requestType: {
      handler(oldValue, newValue) {
        this.getIssueList()
      },
      deep: true
    }
  },
  computed: {
    openedClass() {
      return this.requestType.closed ? { color: '#24292e' } : { color: '#96989b' }
    },
    closedClass() {
      return this.requestType.closed ? { color: '#96989b' } : { color: '#24292e' }
    }
  },
  created() {
    this.getIssueList()
  },
  methods: {
    getIssueList() {
      this.listQuery.taskId = this.taskId
      this.listLoading = true
      pageIssue(this.listQuery).then(res => {
        this.listLoading = false
        this.issueList = res.data.rows
        this.total = res.data.total
      })
    },
    handleCreateIssues() {
      this.$router.push({ name: '新建问题' })
    },
    handleIssuesFilter() {
      this.getIssueList()
    },
    handleFilterLable() {
      this.$router.push({ name: '问题标签' })
    },
    handleFilterMilestone() {
      this.$router.push({ name: '里程碑' })
    },
    handleOpened() {
      this.requestType.closed = false
      this.listQuery.isClosed = 0
    },
    handleClosed() {
      this.requestType.closed = true
      this.listQuery.isClosed = 1
    },
    // handleNewPull() {
    //   this.$router.push({ name: '新建合并请求' })
    // },
    handleUserChanged(newUser) {
      console.log('当前用户' + newUser)
    },
    // filterUser(val) {
    //   if (!val) {
    //     this.filteredUser = this.users
    //   } else {
    //     this.filteredUser = []
    //     this.users.forEach(element => {
    //       if (element.name.indexOf(val) >= 0) {
    //         this.filteredUser.push(element)
    //       }
    //     })
    //   }
    // },
    handleCheckIssue(row) {
      this.$router.push({ name: '任务问题详情', params: { issueId: row.id } })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    },
    timestamp2Text(timestamp) {
      return formatTime(timestamp)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-issue {
  &-header {
    margin-bottom: 16px;
    .new-task-issue {
      margin-left: 20px;
    }

    .issue-button-group {
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
}

.issues-list {
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
  .pull-request-description {
    display: inline-flex;
    h3 {
      margin: -2px 10px;
    }
    &-title {
      span {
        margin-left: 12px;
        font-size: 12px;
        color: #7b7373;
      }
    }
  }
}
</style>
