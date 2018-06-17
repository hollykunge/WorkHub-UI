<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="16">
        <div class="dashboard-content">
          <el-card class="dashboard-content-header" v-show="showNotice">
            <div slot="header">
              <span style="line-height: 0px; display: inline-flex;">
                <h4>通知</h4>
              </span>
              <el-button style="float: right; padding:15px;" type="text" @click="closeNotice">关闭</el-button>
            </div>
            <div class="notice-list" v-for="(notice, index) in notifications" :key="index">
              <span class="notice-list-type">【{{notice.type}}】</span>
              <router-link to="/" class="notice-list-content">{{notice.content}}</router-link>
              <span class="notice-list-time">{{notice.time}}</span>
            </div>
          </el-card>
          <div class="dashboard-content-body">
            <el-card class="dashboard-content-header">
              <div slot="header">
                <span style="line-height: 0px; display: inline-flex;">
                  <h4>动态</h4>
                </span>
                <!-- <el-button style="float: right; padding:15px;" type="text">关闭</el-button> -->
              </div>
              <div class="updating-list" v-for="(updating, index) in updatings" :key="index">
                <span class="updating-list-avatar"><img :src="updating.avatar"></span>
                <router-link :to="updating.path" v-if="updating.type==0" class="updating-list-content">
                  {{updating.userName}} 新建项目
                  <span>{{updating.content}}</span>
                </router-link>
                <router-link :to="updating.path" v-if="updating.type==1" class="updating-list-content">
                  {{updating.userName}} 更新项目
                  <span>{{updating.content}}</span>
                </router-link>
                <router-link :to="updating.path" v-if="updating.type==2" class="updating-list-content">
                  {{updating.userName}} 评论项目
                  <span>{{updating.content}}</span>
                </router-link>
                <span class="updating-list-time">{{updating.time}}</span>
              </div>
            </el-card>
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
// import { mapGetters } from 'vuex'
import Sticky from 'src/components/Sticky/index'
import { NavBox } from 'views/dashboard/components'

export default {
  name: 'dashboard',
  components: { Sticky, NavBox },
  data() {
    return {
      notifications: [],
      updatings: [],
      showNotice: true
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'name',
  //     'avatar',
  //     'email',
  //     'introduction'
  //   ])
  // },
  created() {
    this.getNotice()
    this.getUpdating()
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-container {
  margin: 20px 20px;
  .dashboard-content {
    margin-left: 40px;
    &-header {
      .el-card__header {
        padding: 10px 10px 10px 28px;
      }
      .el-card__body {
        padding: 0 20px 10px 20px;
        .notice-list {
          height: 35px;
          border-bottom: 1px solid #f0f2f5;
          margin-top: 20px;
          &-type {
            color: #001529;
          }
          &-content {
            color: #20a0ff;
          }
          &-time {
            float: right;
            color: grey;
          }
        }
      }
    }
    &-body {
      margin-top: 20px;
      .el-card__header {
        padding: 10px 10px 10px 28px;
      }
      .el-card__body {
        padding: 0 20px 10px 20px;
        max-height: 400px;
        overflow-y: auto;
        .updating-list {
          position: relative;
          height: 80px;
          border-bottom: 1px solid #f0f2f5;
          margin-top: 20px;
          &-avatar {
            color: #001529;
            img {
              width: 32px;
              height: 32px;
            }
          }
          &-content {
            position: absolute;
            margin-top: 5px;
            margin-left: 10px;
            span {
              color: #20a0ff;
            }
          }
          &-time {
            float: right;
            color: grey;
          }
        }
      }
    }
  }
}
</style>
