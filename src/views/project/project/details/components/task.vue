<template>
  <div class="task-list">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="15" :offset="1">
          <!-- <el-button class="filter-item" v-if="allProjects_btn_add" @click="handleCreate" type="primary" icon="edit">新建项目</el-button> -->
          <el-button class="filter-item" @click="handleCreateTask" type="success" icon="plus" size="small">创建任务</el-button>
        </el-col>
        <el-col :span="6">
          <!-- <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="项目名称" v-model="listQuery.projectName"> </el-input> -->
          <el-input @keyup.enter.native="handleTaskFilter" class="filter-item" placeholder="任务名称" size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleTaskFilter" size="small">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="task-list-content">
      <el-row type="flex" justify="center">
        <el-col>
          <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row empty-text="暂无任务数据" style="width: 100%">
            <!-- <el-table-column label="任务列表"> -->
            <el-table-column label="序号" prop="taskId"></el-table-column>
            <el-table-column label="任务名称" prop="taskName"></el-table-column>
            <el-table-column label="负责人" prop="taskReser"></el-table-column>
            <el-table-column label="创建时间" prop="taskCrtTime"></el-table-column>
            <el-table-column label="计划完成时间" prop="taskPlanEndTime"></el-table-column>
            <!-- </el-table-column> -->
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        projectName: undefined
      },
      list: [],
      listLoading: false
    }
  },
  methods: {
    handleCreateTask() {
      console.log('新建任务')
    },
    handleTaskFilter() {
      console.log('筛选任务')
    }
  }
}
</script>

<style>

</style>
