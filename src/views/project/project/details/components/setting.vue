<template>
  <!--以纵向的tab页展示-->
  <div class="project-setting-container">
    <!-- <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs> -->
    <el-row justify="center" align="start">
      <el-col :span="6">
        <div class="setting-nav-bar">
          <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="el-icon-message"></i>导航一</el-menu-item>
            <icon name="inbox"></icon>
            <el-menu-item index="2">
              <i class="el-icon-message"></i>导航二</el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-message"></i>导航三</el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-message"></i>导航四</el-menu-item>

          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName2: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* display: table-row-group; */
// .project-setting-container {
// .el-tabs__header {
// position: absolute;
// right: 200px;
// width: 20%;
// .el-tabs__nav-wrap {
// .el-tabs__item {
// display: table-row-group;
// }
// }
// }
// .el-tabs__content {
// width: 50%;
// padding-left: 30%;
// padding-top: 3%;
// z-index: 0;
// position: absolute;
// }
// }
.setting-nav-bar {
  padding: 20% 5% 0 10%;
  width: 72%;
  text-align: center;
  .el-menu {
    border: 0.5px ridge rgb(129, 144, 148);
    background-color: #ffffff;
    .el-menu-item {
      border: 0.5px ridge rgb(129, 144, 148);
      height: 38px;
      line-height: 40px;
    }
  }
}
</style>