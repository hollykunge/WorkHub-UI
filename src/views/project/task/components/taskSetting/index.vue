<template>
  <!--以纵向的tab页展示-->
  <div class="task-setting-container">
    <el-row justify="center" align="start">
      <el-col :span="6">
        <div class="setting-nav-bar">
          <el-menu mode="vertical" default-active="basicSetting" @select="handleClick">
            <el-menu-item index="basicSetting">
              <icon name="inbox"></icon>基础设置
            </el-menu-item>
            <el-menu-item index="branchManage">
              <icon name="puzzle-piece"></icon>分支管理
            </el-menu-item>
            <el-menu-item index="otherSettings">
              <icon name="retweet"></icon>其他设置
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="setting-content-container">
          <div class="setting-content-container-header">
            <p v-if="activeItem=='basicSetting'">基础设置</p>
            <p v-if="activeItem=='branchManage'">分支管理</p>
            <p v-if="activeItem=='otherSettings'">其他设置</p>
          </div>
          <div class="basicSetting-container" v-if="activeItem=='basicSetting'">
            <el-form :model="taskInfo" label-width="100px">
              <el-form-item label="任务名称">
                <el-input v-model="taskInfo.taskName" placeholder="请输入任务名称"></el-input>
              </el-form-item>
              <el-form-item label="任务负责人">
                <el-input v-model="taskInfo.taskUser" placeholder="输入姓名进行搜索"></el-input>
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
      activeItem: 'basicSetting',
      taskInfo: {
        taskName: undefined,
        taskUser: undefined
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
  padding: 20% 5% 0 10%;
  width: 72%;
  text-align: left;
  .el-menu {
    background-color: #ffffff;
    .el-menu-item {
      border-radius: 13px;
      border: 0.5px ridge rgb(129, 144, 148);
      height: 38px;
      line-height: 40px;
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
  .basicSetting-container {
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