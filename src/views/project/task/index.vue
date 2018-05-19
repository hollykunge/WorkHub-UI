<template>
  <!--任务详情页首页-->
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
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane v-for="(tab, index) in tabs" :key="index" :name="tab.name">
            <span slot="label" @click="handleTest(tab.name)">
              <icon :name="tab.icon"></icon> {{tab.lable}}
            </span>

            <!-- <keep-alive>
              <component v-show="status==''" v-bind:is="tab.name" :ref="tab.name" @toggleStatus="changeStatue"></component>
            </keep-alive>
            <create-file v-show="status=='create'" @toggleStatus="changeStatue"></create-file>
            <upload-file v-show="status=='upload'" @toggleStatus="changeStatue"></upload-file>
            <request-content v-show="status=='request'" @toggleStatus="changeStatue"></request-content> -->
          </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getObj as getTaskObj } from 'api/project/task/index'
import { getObj as getProjectObj } from 'api/project/index'
import { memberList, taskData, pullRequest, chartManage,
  taskIntro, taskSetting, versionHistory, createFile,
  uploadFile, requestContent } from './components/index'
export default {
  props: ['projectId', 'taskId'], // 获取路由上项目的id
  components: {
    memberList, taskData, pullRequest, chartManage, taskIntro, taskSetting, versionHistory, createFile, uploadFile, requestContent
  },
  data() {
    return {
      activeName: 'pullRequest', // 进去详情页首先显示的标签
      task: {}, /* 用解构赋值的方式来解的数据 */
      project: {},
      tabs: [{ name: 'taskData', icon: 'list-ul', lable: '数据' },
      { name: 'pullRequest', icon: 'mail-forward', lable: '合并请求' },
      { name: 'chartManage', icon: 'bar-chart-o', lable: '图标管理' },
      { name: 'taskIntro', icon: 'info', lable: '任务简介' },
      { name: 'versionHistory', icon: 'gg', lable: '历史版本' },
      { name: 'memberList', icon: 'users', lable: '成员' },
      { name: 'taskSetting', icon: 'gears', lable: '设置' }],
      status: ''
    }
  },
  created() {
    var str = window.location.href
    var index = str.lastIndexOf('\/')
    this.getTaskBasicInfo(this.taskId, this.projectId)
    this.activeName = str.substring(index + 1, str.length)
  },
  watch: {
    activeName(val) {
      // this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + this.taskId + '/' + val)
      // console.log(val)
    }
  },
  methods: {
    handleTest(val) {
      console.log(val)
      this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + this.taskId + '/' + val)
    },
    handleTabClick(tab, event) {
      // 触发tab内组件的初始化（请求后台数据）
      // this.$refs[tab.name][0].handleTabClick()

      // 用路由控制组件
      this.activeName = tab.name
      this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + this.taskId + '/' + tab.name)
      console.log(tab.name)
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
    },
    getTaskId() {
      return this.taskId
    },
    changeStatue(data) {
      if (data === undefined) {
        this.status = ''
      } else {
        this.status = data
      }
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
      .mark {
        .el-badge__content {
          background-color: #20aaff;
        }
      }
    }
  }
}
</style>

