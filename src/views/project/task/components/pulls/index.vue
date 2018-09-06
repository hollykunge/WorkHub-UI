<template>
  <div class="pull-request">
    <div class="pull-request-header">
      <el-row>
        <el-col :span="12">
          <el-button class="new-pull-request" type="success" size="small" @click="handleNewPull">新建合并请求</el-button>
        </el-col>
        <el-col :span="12">
          <div class="pull-request-button-group">
            <el-button-group>
              <el-button @click="handleLable" type="warning" size="small" plain>
                <icon name="bookmark"></icon>标签</el-button>
              <el-button @click="handleMilestone" type="warning" size="small" plain>
                <icon name="flag"></icon>里程碑</el-button>
            </el-button-group>
            <el-input @keyup.enter.native="handlePullFilter" placeholder="输入关键词" size="small" v-model="listQuery.title"></el-input>
            <el-button type="primary" v-waves icon="search" @click="handlePullFilter" size="small">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pull-request-body">
      <el-table :data="pullRequestHeader" :show-header="false" class="file-table-header" empty-text="无更新记录">
        <el-table-column align="left">
          <template scope="scope">
            <span v-show="scope" style="font-size: 13px;">
              <a :style="closedClass" @click="handleOpened">
                <icon name="circle-o"></icon>
                <strong>待解决</strong>
              </a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a :style="openedClass" @click="handleClosed">
                <icon name="check"></icon>
                <strong>已完成</strong>
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

      <el-table :data="pullRequestList" v-loading="listLoading" :show-header="false">
        <el-table-column align="left" show-overflow-tooltip>
          <template scope="scope">
            <div class="pull-request-description">
              <icon name="exchange" style="color: #13ce66"></icon>
              <div class="pull-request-description-title">
                <h3 @click="handleCheckRequest(scope.row)">
                  <a>{{scope.row.title}}</a>
                </h3>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" show-overflow-tooltip>
          <template scope="scope">
            <span class="pull-request-content">{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column label="center" show-overflow-tooltip>
          <template scope="scope">
            <span class="pull-request-content"># {{scope.row.index}} 由
              <a>{{scope.row.headUserName}}</a>提交</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template scope="scope">
            <span v-if="scope.row.commentNum!=0" style="color: #7b7373;">
              <a>
                <icon name="comment-o"></icon>
                {{scope.row.commentNum}}
              </a>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="task-label-footer">
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
import { pagePull, allPull, getPull, addPull, putPull, delPull } from 'api/project/pull/index'

export default {
  props: ['projectId', 'taskId'],
  components: { propertySelect },
  data() {
    return {
      listQuery: {
        title: undefined,
        limit: 10,
        page: 1,
        hasMerged: 0
      },
      listLoading: false,
      total: 0,
      // 通过用户搜索
      // fliterUserText: '',
      // filteredUser: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      users: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      // 对请求进行筛选，修改筛选条件时改变相应对象的值
      requestType: { closed: false, currentUser: '' },

      pullRequestHeader: [{ name: 'jihainan', hashCode: 'b2a5e260d4', comment: '修改表头样式', time: '一个小时之前' }],
      pullRequestList: [{ id: 1, index: 13, title: '下载后不能运行', content: '这是我的测试合并请求', headUserName: "姬海南" }]    }
  },
  watch: {
    requestType: {
      handler(oldValue, newValue) {
        this.getPullList()
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
    this.getPullList()
  },
  methods: {
    handleLable() {
      this.$router.push({ name: '问题标签' })
    },
    handleMilestone() {
      this.$router.push({ name: '里程碑' })
    },
    handlePullFilter() {
      this.getPullList()
    },
    handleOpened() {
      this.listQuery.hasMerged = 0
      this.requestType.closed = false
    },
    handleClosed() {
      this.listQuery.hasMerged = 1
      this.requestType.closed = true
    },
    handleNewPull() {
      this.$router.push({ name: '新建合并请求' })
    },
    handleUserChanged(newUser) {
      console.log('当前用户' + newUser)
    },
    handleCheckRequest(row) {
      console.log(row)
      this.$router.push({ name: '合并请求详情', params: { pullId: row.id } })
    },
    handleSizeChange() {
      this.listQuery.limit = val;
      this.getPullList();
    },
    handleCurrentChange() {
      this.listQuery.page = val;
      this.getPullList();
    },
    getPullList() {
      this.listLoading = true
      this.listQuery.taskId = this.taskId
      pagePull(this.listQuery).then(res => {
        if (res.status === 200) {
          this.listLoading = false
          this.pullRequestList = res.data.row
          this.total = res.data.total
        } else (
          this.$notify({
            title: '失败',
            message: '数据获取失败，请重试',
            type: 'error',
            duration: 2000
          })
        )
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.pull-request {
  &-header {
    margin-bottom: 16px;
    .new-pull-request {
      margin-left: 20px;
    }
    .pull-request-button-group {
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
  &-body {
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
    .pull-request {
      &-description {
        display: inline-flex;
        h3 {
          margin: -2px 10px;
        }
      }
      &-content {
        color: #586069;
        font-size: 12px;
        a:hover {
          border-bottom: 1px solid;
        }
      }
    }
  }
}
</style>
