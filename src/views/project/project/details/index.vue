<template>
  <!--项目详情页首页-->
  <div>
    <el-row justify="start">
      <el-col :span="10">
        <div class="index-project">
          <icon name="folder-open"></icon>
          <el-button type="text">{{ project.projectName }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="project-button-group">
          <el-button-group>
            <el-button type="warning" size="small" plain>
              <icon name="eye"></icon>
              浏览</el-button>
            <el-button type="warning" size="small" plain>{{ 0 }}</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" plain>
              <icon name="heart"></icon>收藏</el-button>
            <el-button type="primary" size="small" plain>{{ 0 }}</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="success" size="small" plain>
              <icon name="download"></icon>下载</el-button>
            <el-button type="success" size="small" plain>{{ 0 }}</el-button>
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
              <!-- <el-badge v-if="tab.name=='projectData'" class="mark" :value="taskNum"></el-badge> -->
              <!-- <el-badge v-if="tab.name=='ProjectIssue'" class="mark" :value="1"></el-badge> -->
            </span>
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getObj } from 'api/project/index'
export default {
  props: ['projectId'], // 获取路由上项目的id
  data() {
    return {     // 用解构赋值的方式来解project的数据
      activeName: '', // 进去详情页首先显示的标签
      project: {},
      taskNum: '',
      // tab页数据
      tabs: [
        // { name: 'projectIntro', icon: 'file-text-o', lable: '项目简介' },
        { name: 'projectData', icon: 'list-ul', lable: '任务列表' },
        // { name: 'ProjectIssue', icon: 'question-circle-o', lable: '问题研讨' },
        { name: 'projectTeam', icon: 'users', lable: '团队列表' },
        { name: 'projectSetting', icon: 'gears', lable: '项目设置' }]
    }
  },
  created() {
    this.tabNavigation()
    this.getProBasicInfo(this.projectId)
  },
  methods: {
    handleTabClick(val) {
      console.log(val)
      this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + val)
    },
    getProBasicInfo(projectId) {
      getObj(projectId).then(res => {
        const data = res.data;
        (this.project = data) // 解构赋值
      })
    },
    setTaskNum(taskNum) {
      this.taskNum = taskNum
    },
    tabNavigation() { // 根据路由地址导航到对应的tab页
      const str = window.location.href
      const index = str.lastIndexOf('\/')
      const tab = str.substring(index + 1, str.length)
      if (tab === 'new' || tab === 'upload') {
        this.activeName = 'taskData'
      } else if (tab === 'conversation' || tab === 'commit' || tab === 'checks' || tab === 'filesChanged' || tab === 'newPull') {
        this.activeName = 'ProjectIssue'
      } else {
        this.activeName = tab
      }
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.index-project {
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
.project-button-group {
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
