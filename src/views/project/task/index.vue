<template>
  <!--任务详情页首页-->
  <div>
    <el-row type="flex" justify="start">
      <el-col :span="16">
        <div class="index-task">
          <icon name="folder-open"></icon>
          <el-button type="text" @click="ToProject">{{ project.projectName }}</el-button>
          <icon name="chevron-right"></icon>
          <el-button type="text">{{ task.taskName }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="task-button-group" v-if="false">
          <el-button-group>
            <el-button type="warning" size="small" plain>
              <icon name="code-fork"></icon>
              分支</el-button>
            <el-button type="warning" size="small" plain>{{ 0 }}</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" plain>
              <icon name="heart"></icon>收藏</el-button>
            <el-button type="primary" size="small" plain>{{ 0 }}</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane v-for="(tab, index) in tabs" :key="index" :name="tab.name">
            <span slot="label" @click="handleTabClick(tab.name)">
              <icon :name="tab.icon"></icon> {{tab.lable}}
              <el-badge v-if="tab.name=='pullRequest'" class="mark" :value="pullNum"></el-badge>
            </span>
          </el-tab-pane>
        </el-tabs>
        <el-row justify="center">
          <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:24,offset:0}" :lg="{span:18,offset:2}">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getObj as getTaskObj } from 'api/project/task/index'
import { getObj as getProjectObj } from 'api/project/index'
export default {
  props: ['projectId', 'taskId'], // 获取路由上项目的id
  data() {
    return {
      activeName: '', // 进去详情页首先显示的标签
      task: {}, /* 用解构赋值的方式来解的数据 */
      project: {},
      tabs: [{ name: 'taskData', icon: 'list-ul', lable: '数据' },
      { name: 'pullRequest', icon: 'mail-forward', lable: '合并请求' },
      // { name: 'chartManage', icon: 'bar-chart-o', lable: '图表管理' },
      { name: 'taskIssue', icon: 'question-circle-o', lable: '问题研讨' },
      { name: 'taskIntro', icon: 'info', lable: '任务简介' },
      { name: 'versionHistory', icon: 'gg', lable: '历史版本' },
      { name: 'memberList', icon: 'users', lable: '成员' },
      { name: 'taskSetting', icon: 'gears', lable: '设置' }],
      pullNum: 3 // 这个数据应该从上面的task中获得
    }
  },
  created() {
    this.tabNavigation()
    this.getTaskBasicInfo(this.taskId, this.projectId)
  },
  watch: {
  },
  methods: {
    handleTabClick(val) {
      console.log(val)
      this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + this.taskId + '/' + val)
    },
    getTaskBasicInfo(taskId, projectId) {
      getTaskObj(taskId).then(res => {
        const data = res.data;
        data.taskName = data.taskName.match(/\/(\S*)(?=.git)/)[1];
        (this.task = data) // 解构赋值
      })
      getProjectObj(projectId).then(res => {
        const data = res.data;
        (this.project = data) // 解构赋值
      })
    },
    ToProject() {
      this.$router.push({ name: '项目详情', params: { projectId: this.projectId }})
    },
    tabNavigation() { // 根据路由地址导航到对应的tab页
      const str = window.location.href
      const index = str.lastIndexOf('\/')
      const tab = str.substring(index + 1, str.length)
      if (tab === 'new' || tab === 'upload') {
        this.activeName = 'taskData'
      } else if (tab === 'conversation' || tab === 'commit' || tab === 'checks' || tab === 'filesChanged' || tab === 'newPull') {
        this.activeName = 'pullRequest'
      } else if (tab === 'taskIssue' || tab === 'newIssue') {
        this.activeName = 'taskIssue'
      } else {
        this.activeName = tab
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.index-task {
  height: 30px;
  margin: 25px 0 10px 25px;
  .fa-icon {
    font-size: 12px;
    color: #11181d9a;
  }
  .el-button {
    margin-left: -3px;
    font-size: 17px;
    line-height: 0;
    color: #20a19b;
    &:hover {
      color: #20a0ff;
    }
  }
}
.task-button-group {
  position: absolute;
  top: 10px;
  right: 18px;
  padding: 12px;
  .el-button {
    margin-left: 30px;
    &:not(:last-child) {
      margin-right: 0px;
      border-right-color: #acb1b7;
    }
    .fa-icon {
      font-size: 13px;
      margin-bottom: -3px;
      margin-right: 1px;
    }
  }
}
.el-tabs.el-tabs--card {
  margin-bottom: 8px;
}
.el-tabs__nav-scroll {
  margin: 0 0 0 10%;
  .el-tabs__nav {
    .el-tabs__item {
      margin: 0px 15px;
      padding: 0px;
      span {
        padding: 16px;
      }
      .mark {
        margin-top: 8px;
        line-height: 1;
        .el-badge__content {
          background-color: #52626d85;
        }
      }
    }

    .el-tabs__item.is-active {
      border-bottom-color: #4faafe;
      .mark {
        .el-badge__content {
          background-color: #20aaff;
        }
      }
    }
  }
}
</style>

