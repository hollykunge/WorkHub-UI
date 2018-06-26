<template>
  <div class="navigation-box">

    <div class="navigation-box-containter">
      <el-card>
        <div slot="header">
          <span style="line-height: 0px; display: inline-flex;">
            <h3>任务列表</h3>
          </span>
          <el-button style="float: right; padding:8px;" type="success" @click="handleCreateTask">新 建 任 务</el-button>
        </div>
        <div style="padding: 0px 15px; margin: 5px 0px;">
          <el-input v-model="taskFilterText" placeholder="搜索任务"></el-input>
        </div>
        <el-table :show-header="false" :data="filteredTsakList" empty-text="没有任务信息">
          <el-table-column>
            <template scope="scope">
              <el-tooltip :content="scope.row.taskDes" placement="top" effect="dark">
                <!-- 任务描述-->
                <router-link :to="{name:'任务详情', params: { projectId: scope.row.taskProjectId, taskId: scope.row.taskId }}">
                  <span style="font-size: 18px; color: #20a0ff;">
                    <icon name="angle-right"></icon>
                    <span style="margin-left: 8px;">{{ scope.row.taskName }}</span>
                  </span>
                </router-link>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="load-more">
          <el-button class="load-more-button" @click="loadMore" v-if="isLoadMore">加载更多</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { page as getTaskList } from 'api/project/task/index'
import Sticky from 'src/components/Sticky/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    Sticky
  },
  data() {
    return {
      taskList: [],
      filteredTsakList: [],
      taskFilterText: '',
      isLoadMore: false,
      loadMoreCounter: 0
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  watch: {
    taskFilterText(val) {
      this.taskFilter(val)
    }
  },
  created() {
    getTaskList({ limit: 10000, taskExecutorId: this.userId }).then(res => {
      this.taskList = res.data.rows
      this.filteredTsakList = res.data.rows
    }).then(() => {
      this.loadMore()
    })
  },
  methods: {
    handleCreateTask() {
      alert('创建新任务')
    },
    taskFilter(val) {
      if (!val) {
        this.filteredTsakList = this.taskList
        this.loadMoreCounter = 0
        this.loadMore()
      } else if (this.taskList === undefined) {
        this.filteredTsakList = []
      } else {
        this.isLoadMore = false
        this.filteredTsakList = []
        this.taskList.forEach(element => {
          if (element.taskName.indexOf(val) >= 0) {
            this.filteredTsakList.push(element)
          }
        })
      }
    },
    loadMore() {
      const Counter = 10 + 8 * this.loadMoreCounter
      if (this.taskList.length <= Counter) {
        this.filteredTsakList = this.taskList
        this.isLoadMore = false
      } else {
        this.filteredTsakList = this.taskList.slice(0, Counter)
        this.isLoadMore = true
      }
      this.loadMoreCounter++
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.navigation-box {
  width: 400px;
  margin-top: 40px;
  margin-left: 60px;
  .el-card {
    background-color: #f0f2f5;
  }
  .el-card__header {
    padding: 10px 15px;
  }
  .el-card__body {
    padding: 0px;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec00;
  }
  .el-table tr {
    background-color: #f0f2f5;
  }
  .load-more {
    text-align: center;
    // display: none; /*默认不显示，ajax调用成功后才决定显示与否*/
    &-button {
      width: 100%;
      background: #f0f2f5;
      border: 1px solid #dbdedf;
    }
  }
}
</style>
