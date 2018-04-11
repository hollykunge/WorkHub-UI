<template>
  <!--项目详情页首页-->
  <div>
    <el-row justify="start">
      <el-col :span="10">
        <div class="index-project">
          <icon name="link"></icon>
          <!-- <el-button type="text">用户名</el-button>
          <icon name="long-arrow-right"></icon> -->
          <el-button type="text">{{ project.projectName }}</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="project-button-group">
          <el-button-group>
            <el-button type="warning" size="small" plain>
              <icon name="eye"></icon>
              浏览</el-button>
            <el-button type="warning" size="small" plain>{{ project.numWatches }}</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" plain>
              <icon name="heart"></icon>收藏</el-button>
            <!-- <icon name="star"></icon> -->
            <el-button type="primary" size="small" plain>{{ project.numStars }}</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="success" size="small" plain>
              <icon name="download"></icon>下载</el-button>
            <el-button type="success" size="small" plain>{{ project.numForks }}</el-button>
          </el-button-group>
          <!-- <el-button type="success" size="small" plain>浏览num_watches</el-button>
          <el-button type="warning" size="small" plain>收藏num_stars</el-button>
          <el-button type="danger" size="small" plain>下载num_forks</el-button> -->
        </div>
      </el-col>
    </el-row>
    <!-- <h1>项目详情页{{ $route.params.projectId }}</h1> -->
    <el-row type="flex" justify="center">
      <el-col>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
          <el-tab-pane name="projectDetail">
            <span slot="label">
              <icon name="file-text-o"></icon> 项目详情
            </span>
            <detail></detail>
          </el-tab-pane>
          <el-tab-pane name="projectTask">
            <span slot="label">
              <icon name="list-ul"></icon> 任务
              <el-badge class="mark" :value="taskNum"></el-badge>
            </span>
            <task :projectId="projectId"></task>
          </el-tab-pane>
          <el-tab-pane name="projectIssues">
            <span slot="label">
              <icon name="question-circle-o"></icon> 问题
              <el-badge class="mark" :value="project.numIssues"></el-badge>
            </span>
            <issue></issue>
          </el-tab-pane>
          <el-tab-pane name="projectTeam">
            <span slot="label">
              <icon name="users"></icon> 项目团队
            </span>
            <team></team>
          </el-tab-pane>
          <el-tab-pane name="projectSetting">
            <span slot="label">
              <icon name="gears"></icon> 设置
            </span>
            <!-- {{ projectId }} -->
            <setting></setting>
          </el-tab-pane>
          <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getObj } from 'api/project/index'
import detail from './components/detail'
import task from './components/task'
import issue from './components/issue'
import team from './components/team'
import setting from './components/setting'
export default {
  props: ['projectId'], // 获取路由上项目的id
  components: {
    detail, task, issue, team, setting
  },
  data() {
    return {     /* 用解构赋值的方式来解project的数据 */
      activeName: 'projectTask', // 进去详情页首先显示的标签
      project: {},
      taskNum: '0'
      /* projectName: undefined,
      projectDes: undefined,
      projectGroupId: undefined,
      projectLabel: undefined,
      projectPhase: undefined,
      projectPlanEnd: undefined,
      projectProcess: undefined,
      projectResourceId: null,
      projectState:1,"projectTimeEnd":"2018-03-30T00:50:00.000+0000",
      "projectTimeStart":"2018-03-29T00:50:00.000+0000",
      "projectType":1,
      "projectUserId":1,
      "defaultBranch":"",
      "size":null,
      "numWatches":null,
      "numStars":null,
      "numForks":null,
      "numIssues":null,
      "numClosedIssues":null,
      "numPulls":null,
      "numClosedPulls":null,
      "numMilestones":null,
      "numClosedMilestones":null,
      "enableIssues":null,
      "allowPublicIssues":null,
      "isFork":null,
      "forkId":null,
      "crtName":null,
      "crtUser":null,
      "crtHost":null,
      "crtTime":null,
      "updTime":null,
      "updUser":null,
      "updName":null,
      "updHost":null,
      taskEntityList:[]*/
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getProBasicInfo(this.projectId)
    // console.log(this.getTaskNum())
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route': 'fetchData'
  },
  methods: {
    handleTabClick(tab, event) {
      // console.log(tab, event)
      // console.log(this.projectId)
    },
    getProBasicInfo(projectId) {
      getObj(projectId).then(res => {
        const data = res.data;
        // console.log(data);
        (this.project = data) // 结构赋值
        // console.log(this.project)
      }).then(() => {
        this.taskNum = (String)(this.getTaskNum().length)
        // console.log(this.getTaskNum().length)
      })
    },
    getTaskNum() {
      // this.project.taskEntityList
      return this.project.taskEntityList
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/index.scss";
.index-project {
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
.project-button-group {
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
  margin: 0 0 0 15%;
  .el-tabs__nav {
    .el-tabs__item {
      margin: 0px 35px;
      // :active {
      .mark {
        margin-top: 8px;
        line-height: 1;
        .el-badge__content {
          background-color: #52626d85;
        }
      }
      // }
    }

    .el-tabs__item.is-active {
      // :active {
      .mark {
        .el-badge__content {
          background-color: #20aaff;
        }
      }
      // }
    }

    // .setting {
    //   margin-left: 100%;
    // }
  }
}
// el-tab-pane {
//   .setting {
//     margin-left: 100%;
//   }
// }
// .el-tabs__item {
// .setting {
//   margin-left: 100%;
// }
// }
// .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
//   margin-left: 58%;
// }
// .mark {
//   margin-top: 8px;
//   line-height: 1;
//   .el-badge__content {
//     background-color: #52626d85;
//   }
// }
</style>
