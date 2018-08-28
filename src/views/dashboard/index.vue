<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="16">
        <div class="dashboard-content">
          <div class="dashboard-content-body">
            <el-tabs v-model="activeName">
              <el-tab-pane v-for="(tab, index) in tabs" :key="index" :name="tab.name">
                <span slot="label" @click="handleTabClick(tab.name)">
                  <!-- <icon :name="tab.icon"></icon> -->
                  {{tab.lable}}
                  <!-- <el-badge v-if="tab.name=='projectData'" class="mark" :value="taskNum"></el-badge> -->
                  <!-- <el-badge v-if="tab.name=='ProjectIssue'" class="mark" :value="1"></el-badge> -->
                </span>
              </el-tab-pane>
            </el-tabs>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>

          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <nav-box></nav-box>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sticky from 'src/components/Sticky/index'
import { NavBox } from 'views/dashboard/components'

export default {
  name: 'dashboard',
  components: { Sticky, NavBox },
  data() {
    return {
      notifications: [],
      updatings: [],
      showNotice: false,
      activeName: '',
      tabs: [
        { name: 'activity', icon: 'list-ul', lable: '最新动态' },
        { name: 'statistic', icon: 'users', lable: '数据统计' }]
    }
  },
  created() {
    this.getNotice()
    this.getUpdating()
    this.tabNavigation()
  },
  watch: {
  },
  methods: {
    getNotice() {
      this.notifications = [{ type: '系统消息', content: '协同设计平台3.0版本已上线，点击查看新版本功能介绍', time: '2018-6-20 10:00' }, { type: '任务提醒', content: '姬海南邀请您加入WORKHUB项目组', time: '2018-6-25 9:00' }]
    },
    getUpdating() {
      this.updatings = [
        { type: 0, userName: '白向洋', avatar: 'static/images/avatars/139064.jpg', content: '遥感空间信息可信度理论与关键技术', path: '/', time: '2018-06-30' },
        { type: 1, userName: '周星星', avatar: 'static/images/avatars/139065.jpg', content: '新型仿真机器人', path: '/', time: '2018-06-28' },
        { type: 2, userName: '朱偏右', avatar: 'static/images/avatars/139066.png', content: '工程效能', path: '/', time: '2018-06-26' },
        { type: 0, userName: '王梦源', avatar: 'static/images/avatars/139067.png', content: '卫星通导及系统融合产业化', path: '/', time: '2018-06-26' },
        { type: 2, userName: '胡  超', avatar: 'static/images/avatars/139068.jpg', content: '智能生产', path: '/', time: '2018-06-26' },
        { type: 1, userName: '赵海波', avatar: 'static/images/avatars/139065.jpg', content: '工业机器人', path: '/', time: '2018-06-26' },
        { type: 0, userName: '张童飞', avatar: 'static/images/avatars/139067.png', content: '安全防御关键技术', path: '/', time: '2018-06-26' },
        { type: 2, userName: '米思坤', avatar: 'static/images/avatars/139068.jpg', content: '八月迭代', path: '/', time: '2018-06-26' }]
    },
    closeNotice() {
      this.showNotice = false
    },
    handleTabClick(val) {
      this.$router.push('/dashboard/' + val)
    },
    tabNavigation() { // 根据路由地址导航到对应的tab页
      const str = this.$route.fullPath
      const index = str.lastIndexOf('\/')
      const tab = str.substring(index + 1, str.length)
      this.activeName = tab
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-container {
  margin: 0 20px 20px 20px;
  .dashboard-content {
    margin-left: 20px;
    &-body {
      .el-tabs__nav-scroll {
        margin: 0;
        .el-tabs__nav {
          .el-tabs__item {
            margin: 0;
            padding: 0;
            height: 80px;
            line-height: 88px;
            font-size: 20px;
            color: #1f2d3d;
            &.is-active {
              color: #20a0ff;
            }
            span {
              padding: 32px 16px;
            }
          }
        }
      }
    }
  }
  .calendar-heatmap {
    margin-top: 40px;
    margin-bottom: 100px;
  }
}
</style>
