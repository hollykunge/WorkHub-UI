<template>
  <!--以纵向的tab页展示-->
  <div class="project-setting-container">
    <el-row justify="center" align="start">
      <el-col :span="6">
        <div class="setting-nav-bar">
          <el-menu mode="vertical" default-active="baseInfo" @select="handleClick">
            <el-menu-item index="baseInfo">
              <icon name="inbox"></icon>项目基本信息设置
            </el-menu-item>
            <el-menu-item index="versionInfo">
              <icon name="puzzle-piece"></icon>版本管理
            </el-menu-item>
            <el-menu-item index="authInfo">
              <icon name="retweet"></icon>相关权限设置
            </el-menu-item>
            <el-menu-item index="archiveMagt">
              <icon name="file"></icon>归档管理</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="setting-content-container">
          <div class="setting-content-container-header">
            <p v-if="activeItem=='baseInfo'">基本设置</p>
          </div>
          <div></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 'baseInfo'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
      this.activeItem = tab
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
  text-align: left;
  .el-menu {
    // border: 0.5px ridge rgb(129, 144, 148);
    background-color: #ffffff;
    // border-radius: 13px;
    .el-menu-item {
      border-radius: 13px;
      border: 0.5px ridge rgb(129, 144, 148);
      height: 38px;
      line-height: 40px;
    }
    .is-active {
      // position: absolute;
      // top: 0;
      // bottom: 0;
      // left: 0;
      // width: 2px;
      // content: "";
      // background-color: #e36209;
      // margin-left: 100px;
      border-left: 4px solid #e36209;
    }
  }
}
.setting-content-container {
  padding: 0px 10% 0 0;
  // background-color: rgba(193, 199, 201, 0.589);
  &-header {
    color: #24292e;
    border-bottom: 1px solid #dbdedf;
  }
}
// .fa-icon {
//   margin-top: 50px;
// }
</style>