<template>
  <!--项目详情页-->
  <div>
    <el-row justify="start">
      <el-col :span="10">
        <div class="index-project">
          <icon name="link"></icon>
          <!-- <el-button type="text">用户名</el-button>
          <icon name="long-arrow-right"></icon> -->
          <el-button type="text">项目名称</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="project-button-group">
          <el-button-group>
            <el-button type="warning" size="small">
              <icon name="eye"></icon>
              浏览</el-button>
            <el-button type="warning" size="small" plain>12</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small">
              <icon name="heart-o"></icon>收藏</el-button>
            <!-- <icon name="star"></icon> -->
            <el-button type="primary" size="small" plain>12</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="success" size="small">
              <icon name="download"></icon>下载</el-button>
            <el-button type="success" size="small" plain>12</el-button>
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
            项目详情
          </el-tab-pane>
          <el-tab-pane name="projectTask">
            <span slot="label">
              <icon name="list-ul"></icon> 任务
              <el-badge class="mark" :value="3"></el-badge>
            </span>
            任务
          </el-tab-pane>
          <el-tab-pane name="projectIssues">
            <span slot="label">
              <icon name="question-circle-o"></icon> 问题
              <el-badge class="mark" :value="3"></el-badge>
            </span>问题
          </el-tab-pane>
          <el-tab-pane name="projectTeam">
            <span slot="label">
              <icon name="users"></icon> 项目团队
            </span>
            项目团队</el-tab-pane>
          <el-tab-pane name="projectSetting">
            <span slot="label">
              <icon name="users"></icon> 设置
            </span>
            设置</el-tab-pane>
          <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'projectTask'
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
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
.mark {
  margin-top: 8px;
  line-height: 1;
  .el-badge__content {
    background-color: #52626d9a;
  }
}
</style>
