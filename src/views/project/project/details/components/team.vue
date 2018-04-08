<template>
  <div class="project-team-list">
    <el-row>
      <el-col :span="10" class="team-list">
        <div class="team-header">
          <p>团队列表</p>
        </div>
        <el-table :data="teamList" v-loading.body="listLoading" border empty-text="暂无团队数据" fit style="width: 100%">
          <el-table-column label="团队名称" prop="teamName"></el-table-column>
          <el-table-column label="负责人" prop="teamLeader"></el-table-column>
          <el-table-column label="创建时间" prop="teamCrtTime"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="14" class="team-detail" v-show="!isCreate">
        <div class="team-header">
          <p>团队详情</p>
        </div>
      </el-col>
      <el-col :span="14" class="team-detail" v-show="isCreate">
        <div class="team-header new-team">
          <p>创建新的团队</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamList: [],
      listLoading: false,
      isCreate: false
    }
  }
}
</script>

<style>
.team-header {
  font-size: large;
  text-align: center;
  margin-top: -10px;
  margin-bottom: -10px;
  color: #20a0ff;
  /* &new-team: {

  } */
}
</style>
