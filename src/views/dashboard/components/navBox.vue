<template>
  <div class="navigation-box">
    <sticky className="navigation-box-containter" :stickyTop="80" :zIndex="100">
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
        <el-table :show-header="false" :data="filteredTsakList" max-height="500" empty-text="没有任务信息">
          <el-table-column>
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <!-- 任务描述-->
                <span style="font-size: 16px;">{{ scope.row.taskDes }}</span>
                <div slot="reference">
                  <router-link :to="{name:'任务详情', params: { projectId: scope.row.taskProjectId, taskId: scope.row.taskId }}">
                    <span style="font-size: 18px; color: #20a0ff;">
                      <icon name="angle-right"></icon>
                      <span style="margin-left: 8px;">{{ scope.row.taskName }}</span>
                    </span>
                  </router-link>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </sticky>
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
      taskList: undefined,
      filteredTsakList: undefined,
      taskFilterText: ''
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
    })
  },
  methods: {
    handleCreateTask() {
      alert('创建新任务')
    },
    taskFilter(val) {
      if (!val) {
        this.filteredTsakList = this.taskList
      } else if (this.taskList === undefined) {
        this.filteredTsakList = []
      } else {
        this.filteredTsakList = []
        this.taskList.forEach(element => {
          if (element.taskName.indexOf(val) >= 0) {
            this.filteredTsakList.push(element)
          }
        })
      }
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.navigation-box {
  width: 400px;
  margin-top: 60px;
  margin-left: 60px;
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
}
</style>
