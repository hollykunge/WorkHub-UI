<template>
  <!--项目详情页首页-->
  <div>
    <el-row type="flex" justify="start">
      <el-col :span="10">
        <div class="index-task">
          <icon name="folder-open"></icon>
          <el-button type="text" @click="ToProject">{{ project.projectName }}</el-button>
          <icon name="chevron-right"></icon>
          <el-button type="text">{{ task.taskName }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="task-button-group">
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
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
          <el-tab-pane name="taskData">
            <span slot="label">
              <icon name="list-ul"></icon> 数据
            </span>
            <task-data ref="taskData"></task-data>
          </el-tab-pane>
          <el-tab-pane name="pullRequests">
            <span slot="label">
              <icon name="mail-forward"></icon> 合并请求
            </span>
            <pull-requests ref="pullRequests"></pull-requests>
          </el-tab-pane>
          <el-tab-pane name="chartManage">
            <span slot="label">
              <icon name="bar-chart-o"></icon> 图表管理
            </span>
            <chart-manage ref="chartManage"></chart-manage>
          </el-tab-pane>
          <el-tab-pane name="versionHistory">
            <span slot="label">
              <icon name="gg"></icon> 版本历史
            </span>
            <version-history ref="versionHistory"></version-history>
          </el-tab-pane>
          <el-tab-pane name="taskMember">
            <span slot="label">
              <icon name="users"></icon> 任务成员
            </span>
            <member-list ref="taskMember"></member-list>
          </el-tab-pane>
          <el-tab-pane name="taskIntro">
            <span slot="label">
              <icon name="info"></icon> 任务介绍
            </span>
            <task-intro ref="taskIntro"></task-intro>
          </el-tab-pane>
          <el-tab-pane name="taskSetting">
            <span slot="label">
              <icon name="gears"></icon> 设置
            </span>
            <task-setting ref="taskSetting"></task-setting>
            {{ projectId }} {{ taskId }}
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getObj as getTaskObj } from 'api/project/task/index'
import { getObj as getProjectObj } from 'api/project/index'
import memberList from './components/memberList'
import taskData from './components/taskData'
import pullRequests from './components/pullRequests'
import chartManage from './components/chartManage'
import taskIntro from './components/taskIntro'
import taskSetting from './components/taskSetting'
import versionHistory from './components/versionHistory'

export default {
  props: ['projectId', 'taskId'], // 获取路由上项目的id
  components: {
    memberList, taskData, pullRequests, chartManage, taskIntro, taskSetting, versionHistory
  },
  data() {
    return {
      activeName: 'taskData', // 进去详情页首先显示的标签
      task: {}, /* 用解构赋值的方式来解的数据 */
      project: {}
    }
  },
  created() {
    this.getTaskBasicInfo(this.taskId, this.projectId)
  },
  methods: {
    handleTabClick(tab, event) {
      // 触发tab内组件的初始化（请求后台数据）
      this.$refs[tab.name].handleTabClick()
    },
    getTaskBasicInfo(taskId, projectId) {
      getTaskObj(taskId).then(res => {
        const data = res.data;
        (this.task = data) // 解构赋值
      })
      getProjectObj(projectId).then(res => {
        const data = res.data;
        (this.project = data) // 解构赋值
      })
    },
    ToProject() {
      this.$router.push({ name: '项目详情', params: { projectId: this.projectId }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.index-task {
  padding: 12px;
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
.el-tabs__nav-scroll {
  margin: 0 0 0 10%;
  .el-tabs__nav {
    .el-tabs__item {
      margin: 0px 35px;
      .mark {
        margin-top: 8px;
        line-height: 1;
        .el-badge__content {
          background-color: #52626d85;
        }
      }
    }

    .el-tabs__item.is-active {
      .mark {
        .el-badge__content {
          background-color: #20aaff;
        }
      }
    }
  }
}
</style>

