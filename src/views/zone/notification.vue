<template>
  <div class="user-notification" style="z-index:2018">
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
            <div class="message-list" v-for="(message, index) in messageToShow" :key="index">
              <span class="message-list-avatar"><img :src="message.avatar"></span>
              <router-link :to="message.path" v-if="message.type==0" class="message-list-content">
                {{message.userName}} 新建项目
                <span>{{message.content}}</span>
              </router-link>
              <router-link :to="message.path" v-if="message.type==1" class="message-list-content">
                {{message.userName}} 更新项目
                <span>{{message.content}}</span>
              </router-link>
              <router-link :to="message.path" v-if="message.type==2" class="message-list-content">
                {{message.userName}} 评论项目
                <span>{{message.content}}</span>
              </router-link>
              <span class="message-list-time">{{message.time}}</span>
              <div class="message-list-detail">
                <div class="message-list-detail-content" v-if="currentRow==index">
                  <p>针对遥感空间信息可信度理论在航天重大工程实际应用中需要解决的关键难题，以遥感空间数据获取、处理和应用全过程的质量控制为主线，突破了遥感空间数据可信度量、可信处理和可信评估等核心技术难题，实现了技术创新的四个首次：1）首次设计并构建了航天重大工程的遥感空间信息可信度理论方法，建立了航天探测场景静态要素可信度量模型、航天器（传感器、平台）动态数据可信处理方法和海量空间数据产品可信评估技术；2）首次建立了多波束激光虚焦点成像模型和多法向平面控制几何检校技术，提高了嫦娥探月新型激光敏感器精避障探测的可信度；3）首次破解了颤振“探、分、补”技术难题，实现了卫星平台颤振的精密探测补偿；4）首次建立了海量空间数据产品通用二级抽样评估优化技术，实现了其可信度的科学准确评估。形成了自主知识产权的面向重大航天工程和相关行业空间数据质量控制技术新体系，实现了嫦娥探月、载人航天和测绘卫星等航天工程中遥感空间信息可信度保障的重大创新。</p>
                </div>
                <div>
                  <span class="message-list-detail-button" v-if="currentRow===index && showDetail" @click="packUp(index)">收起
                    <icon name="angle-up"></icon>
                  </span>
                  <span class="message-list-detail-button" v-else @click="showMore(index)">详细信息
                    <icon name="angle-down"></icon>
                  </span>
                </div>
              </div>
            </div>
            <div class="message-pagination">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.page" :page-sizes="[5, 10, 20, 50]" :page-size="pagination.limit" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
              </el-pagination>
            </div>
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
      messageList: [], // 从后台获取到的全部数据
      messageToShow: [], // 展示在当前页面的数据
      showDetail: false,
      currentRow: undefined,
      // **********分页组件***********
      pagination: {
        page: 1,
        total: 6,
        limit: 5
      }
    }
  },
  created() {
    this.getMessageList(this.activeItem)
  },
  watch: {
    pagination: { handler(value) {
      this.handlePaging(value.page, value.limit, value.total)
    },
      deep: true }
  },
  methods: {
    handleClick(tab, event) {
      this.activeItem = tab
      console.log(tab)
      this.getMessageList(tab)
    },
    getMessageList(tab) { // 根据点击的tab页的不同获取不同的数据
      this.messageList = [
        { type: 0, userName: '白向洋', avatar: 'static/images/avatars/139064.jpg', content: '遥感空间信息可信度理论与关键技术', path: '/', time: '2018-06-30' },
        { type: 1, userName: '周星星', avatar: 'static/images/avatars/139065.jpg', content: '新型仿真机器人', path: '/', time: '2018-06-28' },
        { type: 2, userName: '朱偏右', avatar: 'static/images/avatars/139066.png', content: '工程效能', path: '/', time: '2018-06-26' },
        { type: 0, userName: '王梦源', avatar: 'static/images/avatars/139067.png', content: '卫星通导及系统融合产业化', path: '/', time: '2018-06-26' },
        { type: 2, userName: '胡  超', avatar: 'static/images/avatars/139068.jpg', content: '智能生产', path: '/', time: '2018-06-26' },
        { type: 1, userName: '赵海波', avatar: 'static/images/avatars/139065.jpg', content: '工业机器人', path: '/', time: '2018-06-26' },
        { type: 0, userName: '张童飞', avatar: 'static/images/avatars/139067.png', content: '安全防御关键技术', path: '/', time: '2018-06-26' },
        { type: 2, userName: '米思坤', avatar: 'static/images/avatars/139068.jpg', content: '八月迭代', path: '/', time: '2018-06-26' }]
      // 获取消息成功后，调用initPagination方法，初始化分页
      this.initPagination(this.messageList.length)
    },
    showMore(index) {
      this.showDetail = true
      this.currentRow = index
    },
    packUp(index) {
      this.showDetail = false
      this.currentRow = undefined
    },
    initPagination(total, limit) { // 初始化分页
      this.pagination.total = total
      if (limit) {
        this.pagination.limit = limit
      }
    },
    handlePaging(currentPage, limit, total) { // 处理数据的分页
      if (total <= limit) {
        this.messageToShow = this.messageList
      } else {
        const indexFrom = (currentPage - 1) * limit
        const indexTo = currentPage * limit
        this.messageToShow = this.messageList.slice(indexFrom, indexTo)
      }
    },
    handleSizeChange(val) {
      this.pagination.limit = val
    },
    handleCurrentChange(val) {
      this.pagination.page = val
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
      border: 0.5px ridge #819094;
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
  width: 850px;
  &-header {
    color: #24292e;
    border-bottom: 1px solid #dbdedf;
  }
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
          border: 1px solid #d1d5da79;
          border-radius: 3px;
          background-color: #ffffff50;
          p {
            padding: 0 10px;
            word-break: break-all;
            color: #676262;
          }
        }
        &-button {
          font-size: 14px;
          display: block;
          text-align: right;
          color: grey;
          cursor: pointer;
          &:hover {
            color: #20a0ff;
          }
        }
      }
    }
    .message-pagination {
      margin: 25px auto;
    }
  }
}
</style>