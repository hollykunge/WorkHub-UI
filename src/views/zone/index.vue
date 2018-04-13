<template>
  <!--以纵向的tab页展示-->
  <div class="project-setting-container">
    <el-row justify="center" align="start">
      <el-col :span="6">
        <div class="setting-nav-bar">
          <el-menu mode="vertical" default-active="baseInfo" @select="handleClick">
            <el-menu-item index="baseInfo">
              <icon name="inbox"></icon>基础设置
            </el-menu-item>
            <el-menu-item index="userAvatar">
              <icon name="puzzle-piece"></icon>头像设置
            </el-menu-item>
            <el-menu-item index="password">
              <icon name="retweet"></icon>修改密码
            </el-menu-item>
            <el-menu-item index="systemSetting">
              <icon name="file"></icon>系统设置</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="setting-content-container">
          <div class="setting-content-container-header">
            <p v-if="activeItem=='baseInfo'">基础设置</p>
            <p v-if="activeItem=='userAvatar'">头像设置</p>
            <p v-if="activeItem=='password'">修改密码</p>
            <p v-if="activeItem=='systemSetting'">系统设置</p>
          </div>
          <div class="baseInfo-container" v-if="activeItem=='baseInfo'">
            <el-form :model="userInfo" label-width="100px">
              <el-form-item label="项目名称">
                <el-input v-model="userInfo.userName" placeholder="请输入新的用户名"></el-input>
              </el-form-item>
              <el-form-item label="项目负责人">
                <el-input v-model="userInfo.userOrgName" placeholder="请选择新的部门"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">确认更改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 'baseInfo',
      userInfo: {
        userName: undefined,
        userOrgName: undefined
      }
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
  .baseInfo-container {
    padding: 2% 0 0 1%;
    form {
      // .el-form-item {
      // }
      width: 50%;
      .el-button {
        margin-left: 80%;
      }
    }
  }
}
// .fa-icon {
//   margin-top: 50px;
// }
</style>