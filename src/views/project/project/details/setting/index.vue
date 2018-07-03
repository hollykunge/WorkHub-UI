<template>
  <!--以纵向的tab页展示-->
  <div class="project-setting-container">
    <el-row justify="center" align="start">
      <el-col :span="6">
        <div class="setting-nav-bar">
          <el-menu mode="vertical" default-active="baseInfo" @select="handleClick">
            <el-menu-item index="baseInfo">
              <icon name="inbox"></icon>基本设置
            </el-menu-item>
            <el-menu-item index="versionInfo">
              <icon name="puzzle-piece"></icon>版本管理
            </el-menu-item>
            <el-menu-item index="authInfo">
              <icon name="retweet"></icon>权限设置
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
            <p v-if="activeItem=='versionInfo'">版本管理</p>
            <p v-if="activeItem=='authInfo'">权限设置</p>
            <p v-if="activeItem=='archiveMagt'">归档管理</p>
          </div>
          <div class="baseInfo-container" v-if="activeItem=='baseInfo'">
            <el-form :model="projectInfo" label-width="100px">
              <el-form-item label="项目名称">
                <el-input v-model="projectInfo.projectName" placeholder="请输入项目名称"></el-input>
              </el-form-item>
              <el-form-item label="项目负责人">
                <el-input v-model="projectInfo.projectUser" placeholder="输入姓名进行搜索"></el-input>
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
      projectInfo: {
        projectName: undefined,
        projectUser: undefined
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
.setting-nav-bar {
  padding: 20% 5% 0 0%;
  width: 72%;
  text-align: left;
  float: right;
  .el-menu {
    .el-menu-item {
      border-radius: 13px;
      border: 0.5px ridge rgb(129, 144, 148);
      height: 38px;
      line-height: 40px;
      background-color: #ffffff;
    }
    .is-active {
      border-left: 4px solid #20a0ff;
    }
  }
}
.setting-content-container {
  padding: 0px 10% 0 0;
  &-header {
    color: #24292e;
    border-bottom: 1px solid #dbdedf;
  }
  .baseInfo-container {
    padding: 2% 0 0 1%;
    form {
      width: 50%;
      .el-button {
        margin-left: 80%;
      }
    }
  }
}
</style>