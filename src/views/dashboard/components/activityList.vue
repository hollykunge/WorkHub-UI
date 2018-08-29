<template>
  <div class="activity-list">
    <div class="activity-list-container">
      <div class="message-container">
        <!-- 使用统一的数据展示的模板 -->
        <div class="message-list" v-for="(message, index) in displayedList" :key="index" v-if="!message.isPrivate || message.userId == userId">
          <span class="message-list-avatar">
            <Avatar :username="message.actUserName" :size="35" :lighten="200" style=""></Avatar>
          </span>
          <router-link to="/" v-if="message.optType==1" class="message-list-content">
            {{message.actUserName}} 新建任务
            <el-tooltip :content="message.repoName" placement="top-start" effect="dark">
              <span>{{getSubstring(message.repoName)}}</span>
            </el-tooltip>
          </router-link>
          <router-link to="/" v-if="message.optType==2" class="message-list-content">
            {{message.actUserName}} 删除任务
            <el-tooltip :content="message.repoName" placement="top-start" effect="dark">
              <span>{{getSubstring(message.repoName)}}</span>
            </el-tooltip>
          </router-link>
          <router-link to="/" v-if="message.optType==3" class="message-list-content">
            {{message.actUserName}} 修改任务
            <el-tooltip :content="message.repoName" placement="top-start" effect="dark">
              <span>{{getSubstring(message.repoName)}}</span>
            </el-tooltip>
          </router-link>
          <router-link to="/" v-if="message.optType==4" class="message-list-content">
            {{message.actUserName}} 提交数据到
            <el-tooltip :content="message.repoName" placement="top-start" effect="dark">
              <span>{{getSubstring(message.repoName)}}</span>
            </el-tooltip>
          </router-link>
          <router-link to="/" v-if="message.optType==5" class="message-list-content">
            {{message.actUserName}} 对任务
            <el-tooltip :content="message.repoName" placement="top-start" effect="dark">
              <span>{{getSubstring(message.repoName)}}</span>
            </el-tooltip>的人员进行了变更
          </router-link>
          <router-link to="/" v-if="message.optType==6" class="message-list-content">
            {{message.actUserName}} 合并了
            <span>{{message.refName}}</span> 等文件到任务
            <el-tooltip :content="message.repoName" placement="top-start" effect="dark">
              <span>{{getSubstring(message.repoName)}}</span>
            </el-tooltip>
          </router-link>

          <span class="message-list-time">{{timestamp2Text(message.crtTime)}}</span>
          <div class="message-list-detail">
            <div class="message-list-detail-content">
              <p>userId: {{message.userId}} optType: {{message.optType}}, actUserId: {{message.actUserId}}, actUserName: {{message.actUserName}}, repoId: {{message.repoId}}, repoUserName: {{message.repoUserName}}, repoName: {{message.repoName}}, refName: {{message.refName}}, isPrivate: {{message.isPrivate}}, createdUnix: {{message.createdUnix}}, content: {{message.content}}, crtTime: {{message.crtTime}}</p>
            </div>
          </div>
        </div>
        <div v-if="displayedList.length == 0">
          <!-- 暂无动态 -->
          <h4>暂无动态</h4>
        </div>
      </div>
      <div class="load-more">
        <el-button @click="loadMore" v-if="isLoadMore">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivity } from 'api/project/activity/index'
import { mapGetters } from 'vuex'
import { formatTime } from 'utils/index'

export default {
  data() {
    return {
      messageList: [],
      displayedList: [],
      isLoadMore: false,
      loadMoreCounter: 0,
      listQuery: {
        limit: 20,
        page: 1,
        dayBack: 7
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.listQuery.crtUser = this.userId
    this.getMessageList()
  },
  mounted() {
  },
  methods: {
    getMessageList() {
      getActivity(this.listQuery).then(res => {
        console.log(res.data)
        if (res.data.total === 0) {
          this.messageList = [
            // {userId, optType, actUserId, actUserName, repoId, repoUserName, repoName, refName, isPrivate, createdUnix, content}
            // 1创建任务 2删除任务 3修改任务 4提交数据给任务 5任务人员变更 6数据合并
            { userId: 1, optType: 1, actUserId: 1, actUserName: '赵向洋', repoId: 1, repoUserName: '赵向洋', repoName: '新型仿真机器人', refName: '数据名称', isPrivate: false, createdUnix: 'none', content: '遥感空间信息可信现场v现场v现在才v秩序只需啊倒萨顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶度理论与关键技术', crtTime: '1535099458000' },
            { userId: 2, optType: 2, actUserId: 1, actUserName: '孙星星', repoId: 1, repoUserName: '孙星星', repoName: '工程效能', refName: '数据名称', isPrivate: false, createdUnix: 'none', content: '新型仿真机器人', crtTime: '1535099458000' },
            { userId: 3, optType: 3, actUserId: 1, actUserName: '朱偏右', repoId: 1, repoUserName: '朱偏右', repoName: '卫星通导及系统融合产业化', refName: '数据名称', isPrivate: false, createdUnix: 'none', content: '卫星通导及系统融合产业化', crtTime: '1535099458000' },
            { userId: 4, optType: 4, actUserId: 1, actUserName: '王梦源', repoId: 1, repoUserName: '王梦源', repoName: '智能生产', refName: '数据名称', isPrivate: false, createdUnix: 'none', content: '智能生产', crtTime: '1535099458000' },
            { userId: 5, optType: 5, actUserId: 1, actUserName: '胡  超', repoId: 1, repoUserName: '胡  超', repoName: '新型仿真机器人', refName: '数据名称', isPrivate: false, createdUnix: 'none', content: '工业机器人', crtTime: '1535099458000' },
            { userId: 6, optType: 6, actUserId: 1, actUserName: '钱海波', repoId: 1, repoUserName: '钱海波', repoName: '工业机器人', refName: '数据名称', isPrivate: false, createdUnix: 'none', content: '安全防御关键技术', crtTime: '1535099458000' },
            { userId: 3, optType: 4, actUserId: 1, actUserName: '张童飞', repoId: 1, repoUserName: '张童飞', repoName: '八月迭代', refName: '数据名称', isPrivate: true, createdUnix: 'none', content: '八月迭代', crtTime: '1535099458000' },
            { userId: 1, optType: 5, actUserId: 1, actUserName: '米思伟', repoId: 1, repoUserName: '米思坤', repoName: '安全防御关键技术', refName: '数据名称', isPrivate: true, createdUnix: 'none', content: '工程信息化', crtTime: '1535099458000' }]
            this.loadMore()
        } else {
          this.messageList = res.data.rows
          this.loadMore()
        }
      }, rej => {
        console.log('获取最新动态列表失败')
      })
    },
    loadMore() {
      const Counter = 3 + 3 * this.loadMoreCounter
      if (this.messageList.length <= Counter) {
        this.displayedList = this.messageList
        this.isLoadMore = false
      } else {
        this.displayedList = this.messageList.slice(0, Counter)
        this.isLoadMore = true
      }
      this.loadMoreCounter++
    },
    getSubstring(originalString) {
      const stringLength = originalString.length
      if (stringLength > 30) {
        return originalString.substr(0, 30) + '···'
      }
      return originalString
    },
    timestamp2Text(timestamp) {
      return formatTime(timestamp)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.activity-list-header {
  color: #24292e;
  border-bottom: 1px solid #dbdedf;
  h1 {
    font-size: 30px;
  }
}
.activity-list-container {
  .message-container {
    .message-list {
      position: relative;
      border-bottom: 1px solid #dbdedf;
      margin-top: 20px;
      &-avatar {
        display: inline-block;
      }
      &-content {
        position: absolute;
        margin-top: 5px;
        margin-left: 15px;
        font-weight: bolder;
        span {
          color: #20a0ff;
        }
      }
      &-time {
        float: right;
        color: grey;
        margin-top: 5px;
        margin-right: 10px;
      }
      &-detail {
        &-content {
          margin-left: 40px;
          margin-bottom: 15px;
          border: 1px solid #d1d5da79;
          border-radius: 3px;
          background-color: #ffffff50;
          p {
            padding: 0 10px;
            word-break: break-all;
            color: #676262;
          }
        }
      }
    }
  }
  .load-more {
    text-align: center;
    margin: 20px auto;
    // display: none; /*默认不显示，ajax调用成功后才决定显示与否*/
    .el-button {
      width: 100%;
      background: inherit;
      border: 1px solid #dbdedf;
      &:hover {
        background: #fff;
      }
    }
  }
}
</style>