<template>
  <div>
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="15" :offset="1">
          <!-- <el-button class="filter-item" v-if="allProjects_btn_add" @click="handleCreate" type="primary" icon="edit">新建项目</el-button> -->
          <el-button class="filter-item" @click="handleCreateIssues" type="success" icon="plus" size="small">新建问题</el-button>
          <el-button class="filter-item" @click="handleFilterLable" type="warning" icon="lable" size="small" plain>
            <icon name="bookmark" class="issue-icon"></icon>标签
          </el-button>
          <el-button class="filter-item" @click="handleFilterMilestone" type="success" size="small" plain>
            <icon name="flag" class="issue-icon"></icon>里程碑
          </el-button>
        </el-col>
        <el-col :span="6">
          <!-- <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="项目名称" v-model="listQuery.projectName"> </el-input> -->
          <el-input @keyup.enter.native="handleIssuesFilter" class="filter-item" placeholder="问题关键字" size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleIssuesFilter" size="small">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="issues-list">
      <el-table>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  methods: {
    handleCreateIssues() {
      console.log('新建问题')
    },
    handleIssuesFilter() {
      console.log('筛选问题')
    },
    handleFilterLable() {
      console.log('根据标签筛选')
    },
    handleFilterMilestone() {
      console.log('显示里程碑')
    }
  }

}
</script>

<style>
.issue-icon {
  margin: -3px 3px -2px -5px;
}
</style>
