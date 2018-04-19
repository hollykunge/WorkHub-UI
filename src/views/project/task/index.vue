<template>
  <!--项目详情页首页-->
  <div>
    <el-row justify="start">
      <el-col :span="10">
        <div class="index-task">
          <icon name="folder-open"></icon>
          <el-button type="text" @click="ToProject">{{ project.projectName }}</el-button>
          <icon name="chevron-right"></icon>
          <el-button type="text">{{ task.taskName }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
          <el-tab-pane name="taskDetail">
            <span slot="label">
              <icon name="file-text-o"></icon> 任务详情
            </span>
          </el-tab-pane>
          <el-tab-pane name="taskData">
            <span slot="label">
              <icon name="list-ul"></icon> 数据
            </span>
          </el-tab-pane>
          <el-tab-pane name="taskMember">
            <span slot="label">
              <icon name="users"></icon> 成员
            </span>
            <member-list></member-list>
          </el-tab-pane>
          <el-tab-pane name="taskSetting">
            <span slot="label">
              <icon name="gears"></icon> 设置
            </span>
            {{ projectId }} {{ taskId }}
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getObj as getTaskObj } from 'api/project/task/index'
import { getObj as getProjectObj } from 'api/project/index'
import memberList from './components/memberList'
export default {
  props: ['projectId', 'taskId'], // 获取路由上项目的id
  components: {
    memberList
  },
  data() {
    return {
      activeName: 'taskData', // 进去详情页首先显示的标签
      task: {}, /* 用解构赋值的方式来解的数据 */
      project: {}
    }
  },
  created() {
    this.getTaskBasicInfo(this.taskId, this.projectId)
  },
  methods: {
    handleTabClick(tab, event) {
    },
    getTaskBasicInfo(taskId, projectId) {
      getTaskObj(taskId).then(res => {
        const data = res.data;
        (this.task = data) // 解构赋值
      })
      getProjectObj(projectId).then(res => {
        const data = res.data;
        (this.project = data) // 解构赋值
      })
    },
    ToProject() {
      this.$router.push({ name: '项目详情', params: { projectId: this.projectId }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.index-task {
  padding: 12px;
  .fa-icon {
    font-size: 12px;
    color: #11181d9a;
  }
  .el-button {
    margin-left: -3px;
    font-size: 17px;
    line-height: 0;
    color: #20a19b;
    &:hover {
      color: #20a0ff;
    }
  }
}
.el-tabs__nav-scroll {
  margin: 0 0 0 25%;
  .el-tabs__nav {
    .el-tabs__item {
      margin: 0px 35px;
      .mark {
        margin-top: 8px;
        line-height: 1;
        .el-badge__content {
          background-color: #52626d85;
        }
      }
    }

    .el-tabs__item.is-active {
      .mark {
        .el-badge__content {
          background-color: #20aaff;
        }
      }
    }
  }
}
</style>

