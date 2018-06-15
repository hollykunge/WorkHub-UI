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
        <el-table :show-header="false" :data="taskList" max-height="250">
          <el-table-column>
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <!-- 任务描述-->
                <p>{{ scope.row.taskDes }}</p>
                <div slot="reference">
                  <router-link :to="{name:'任务详情', params: { projectId: scope.row.taskProjectId, taskId: scope.row.taskId }}">
                    <span>{{ scope.row.taskName }}</span>
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
      taskList: undefined
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    getTaskList({ limit: 10000, taskExecutorId: this.userId }).then(res => {
      this.taskList = res.data.rows
      console.log(res.data.rows)
    })
  },
  methods: {
    handleCreateTask() {
      alert('创建新任务')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.navigation-box {
  width: 400px;
  margin-top: 60px;
}
</style>
