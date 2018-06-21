<template>
  <!--以纵向的tab页展示-->
  <div class="user-notification">
    <el-row justify="center">
      <el-col :span="6">
        <div class="setting-nav-bar">
          <el-menu mode="vertical" default-active="unreadMessage" @select="handleClick">
            <el-menu-item index="unreadMessage" class="unread">
              <icon name="envelope"></icon>
              <span>未读消息</span>
            </el-menu-item>
            <el-menu-item index="systemNotification">
              <icon name="bullhorn"></icon>
              <span>系统通知</span>
            </el-menu-item>
            <el-menu-item index="taskReminder">
              <icon name="envelope-open-o"></icon>
              <span>任务提醒</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="setting-content-container">
          <div class="setting-content-container-header">
            <h2 v-if="activeItem=='unreadMessage'">未 读 消 息</h2>
            <h2 v-if="activeItem=='systemNotification'">系 统 通 知</h2>
            <h2 v-if="activeItem=='taskReminder'">任 务 提 醒</h2>
          </div>
          <div class="message-container">
            <!-- 使用统一的数据展示的模板 -->
            <div v-for="(message, index) in messageList" :key="index"></div>
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
      activeItem: 'unreadMessage',
      messageList: []
    }
  },
  created() {
    this.getMessageList(this.activeItem)
  },
  methods: {
    handleClick(tab, event) {
      this.activeItem = tab
      console.log(tab)
      this.getMessageList(tab)
    },
    getMessageList(tab) { // 根据点击的tab页的不同获取不同的数据
      this.messageList = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.setting-nav-bar {
  padding: 20% 5% 0 10%;
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
      &.unread {
        margin-bottom: 20px;
      }
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
  .unread-message-container {
  }
  .system-notification-container {
  }
  .task-reminder-container {
  }
}
</style>