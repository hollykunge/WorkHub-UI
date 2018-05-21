<template>
  <div class="pull-request">
    <div class="pull-request-header">
      <el-row>
        <el-col :span="12">
          <el-button class="new-pull-request" type="success" size="small">新建合并请求</el-button>
        </el-col>
        <el-col :span="12">
          <div class="pull-request-button-group">
            <el-button-group>
              <el-button type="warning" size="small" plain>
                标签</el-button>
              <el-button type="warning" size="small" plain>里程碑</el-button>
            </el-button-group>
            <el-input @keyup.enter.native="handleTaskFilter" placeholder="输入关键词" size="small" v-model="searchKeys"></el-input>
            <el-button type="primary" v-waves icon="search" @click="handleTaskFilter" size="small">搜索</el-button>
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
              <el-dropdown trigger="click" menu-align="start" class="user-dropdown">
                <el-button size="small" type="text" class="user-dropdown-button">筛选用户
                  <icon name="caret-down"></icon>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="user-dropdown-content" style="background: #eef1f6; border-radius: 8px; width: 200px;">
                  <span style="line-height: 25px; font-size: 14px; margin-left: 10px;">通过用户筛选
                    <el-input style="margin-bottom: 10px;" placeholder="搜索用户" v-model="fliterUserText" size="small" autofocus></el-input>
                  </span>
                  <el-table @row-click="changeUser" :data="filteredUser" :show-header="false" empty-text="Nothing to show">
                    <el-table-column>
                      <template scope="scope">
                        <span>{{ scope.row.name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column>
                      <template scope="scope">
                        <span v-if="scope.row.name===requestType.currentUser">
                          <icon name="check"></icon>
                        </span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="pullRequestList" :show-header="false">
        <el-table-column align="left">
          <template scope="scope">
            <div class="pull-request-description">
              <icon name="exchange" style="color: #13ce66"></icon>
              <div class="pull-request-description-title">
                <h3 @click="handleCheckRequest(scope.row)">
                  <a>{{scope.row.title}}</a>
                </h3>
                <span>{{scope.row.tips}}</span>
              </div>
            </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeys: '',
      // 通过用户搜索
      fliterUserText: '',
      filteredUser: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      users: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      // 对请求进行筛选，修改筛选条件时改变相应对象的值
      requestType: { closed: false, currentUser: '' },

      pullRequestHeader: [{ name: 'jihainan', hashCode: 'b2a5e260d4', comment: '修改表头样式', time: '一个小时之前' }],
      pullRequestList: [{ id: 1, title: '下载后不能运行', commentNum: '4', tips: '#450 姬海南在一个小时前提交', isFolder: true }, { id: 2, title: '添加window10支持', tips: '#450 test在十分钟前提交', commentNum: '0', isFolder: false }] }
  },
  watch: {
    fliterUserText(val) { this.filterUser(val) },
    // 监听requestType，当变化时根据requestType的值重新获取request列表
    requestType() { }
  },
  computed: {
    openedClass() {
      return this.requestType.closed ? { color: '#24292e' } : { color: '#96989b' }
    },
    closedClass() {
      return this.requestType.closed ? { color: '#96989b' } : { color: '#24292e' }
    }
  },
  methods: {
    // handleTabClick() {
    //   console.log('合并请求')
    //   this.$emit('toggleStatus')
    // },
    handleTaskFilter() {
      console.log('123')
    },
    handleOpened() {
      this.requestType.closed = false
    },
    handleClosed() {
      this.requestType.closed = true
    },
    changeUser(row) {
      this.requestType.currentUser = row.name
      console.log('用户切换成功')
    },
    filterUser(val) {
      if (!val) {
        this.filteredUser = this.users
      } else {
        this.filteredUser = []
        this.users.forEach(element => {
          if (element.name.indexOf(val) >= 0) {
            this.filteredUser.push(element)
          }
        })
      }
    },
    handleCheckRequest(row) {
      // this.$emit('toggleStatus', 'request')
      // 查看请求的详细信息
      // this.$router.push()
      console.log(row)
      this.$router.push({ name: '合并请求详情', params: { pullId: row.id }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.pull-request {
  &-header {
    margin-bottom: 10px;
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
      .el-table__row {
        background-color: #eef1f6;
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
}
</style>
