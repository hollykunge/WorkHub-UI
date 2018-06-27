<template>
  <div class="activity-list">
    <div class="activity-list-header">
      <h1>最 新 动 态</h1>
    </div>
    <div class="activity-list-container">
      <div class="message-container">
        <!-- 使用统一的数据展示的模板 -->
        <div class="message-list" v-for="(message, index) in displayedList" :key="index">
          <span class="message-list-avatar"><img :src="message.avatar"></span>
          <router-link :to="message.path" v-if="message.type==0" class="message-list-content">
            {{message.userName}} 新建项目
            <el-tooltip :content="message.content" placement="top" effect="dark">
              <span>{{message.content}}</span>
            </el-tooltip>
          </router-link>
          <router-link :to="message.path" v-if="message.type==1" class="message-list-content">
            {{message.userName}} 更新项目
            <el-tooltip :content="message.content" placement="top" effect="dark">
              <span>{{message.content}}</span>
            </el-tooltip>
          </router-link>
          <router-link :to="message.path" v-if="message.type==2" class="message-list-content">
            {{message.userName}} 评论项目
            <el-tooltip :content="message.content" placement="top" effect="dark">
              <span>{{message.content}}</span>
            </el-tooltip>
          </router-link>
          <span class="message-list-time">{{message.time}}</span>
          <div class="message-list-detail">
            <div class="message-list-detail-content">
              <p>针对遥感空间信息可信度理论在航天重大工程实际应用中需要解决的关键难题，以遥感空间数据获取、处理和应用全过程的质量控制为主线，突破了遥感空间数据可信度量、可信处理和可信评估等核心技术难题，实现了技术创新的四个首次：1）首次设计并构建了航天重大工程的遥感空间信息可信度理论方法，建立了航天探测场景静态要素可信度量模型、航天器（传感器、平台）动态数据可信处理方法和海量空间数据产品可信评估技术；2）首次建立了多波束激光虚焦点成像模型和多法向平面控制几何检校技术，提高了嫦娥探月新型激光敏感器精避障探测的可信度；3）首次破解了颤振“探、分、补”技术难题，实现了卫星平台颤振的精密探测补偿；4）首次建立了海量空间数据产品通用二级抽样评估优化技术，实现了其可信度的科学准确评估。形成了自主知识产权的面向重大航天工程和相关行业空间数据质量控制技术新体系，实现了嫦娥探月、载人航天和测绘卫星等航天工程中遥感空间信息可信度保障的重大创新。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more">
        <el-button @click="loadMore" v-if="isLoadMore">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageList: [],
      displayedList: [],
      isLoadMore: false,
      loadMoreCounter: 0
    }
  },
  created() {
    this.getMessageList(this.activeItem)
  },
  mounted() {
    this.loadMore()
  },
  methods: {
    getMessageList(tab) { // 根据点击的tab页的不同获取不同的数据
      this.messageList = [
        { type: 0, userName: '白向洋', avatar: 'static/images/avatars/139064.jpg', content: '遥感空间信息可信现场v现场v现在才v秩序只需啊倒萨顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶度理论与关键技术', path: '/', time: '2018-06-30' },
        { type: 1, userName: '周星星', avatar: 'static/images/avatars/139065.jpg', content: '新型仿真机器人', path: '/', time: '2018-06-28' },
        { type: 2, userName: '朱偏右', avatar: 'static/images/avatars/139066.png', content: '工程效能', path: '/', time: '2018-06-26' },
        { type: 0, userName: '王梦源', avatar: 'static/images/avatars/139067.png', content: '卫星通导及系统融合产业化', path: '/', time: '2018-06-26' },
        { type: 2, userName: '胡  超', avatar: 'static/images/avatars/139068.jpg', content: '智能生产', path: '/', time: '2018-06-26' },
        { type: 1, userName: '赵海波', avatar: 'static/images/avatars/139065.jpg', content: '工业机器人', path: '/', time: '2018-06-26' },
        { type: 0, userName: '张童飞', avatar: 'static/images/avatars/139067.png', content: '安全防御关键技术', path: '/', time: '2018-06-26' },
        { type: 2, userName: '米思坤', avatar: 'static/images/avatars/139068.jpg', content: '八月迭代', path: '/', time: '2018-06-26' }]
    },
    loadMore() {
      const Counter = 2 + 3 * this.loadMoreCounter
      if (this.messageList.length <= Counter) {
        this.displayedList = this.messageList
        this.isLoadMore = false
      } else {
        this.displayedList = this.messageList.slice(0, Counter)
        this.isLoadMore = true
      }
      this.loadMoreCounter++
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
        color: #001529;
        img {
          width: 32px;
          height: 32px;
        }
      }
      &-content {
        position: absolute;
        margin-top: 5px;
        margin-left: 20px;
        font-weight: bolder;

        // 字数过多时显示省略号
        width: 750px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          color: #20a0ff;
        }
      }
      &-time {
        float: right;
        color: grey;
      }
      &-detail {
        &-content {
          margin-left: 50px;
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