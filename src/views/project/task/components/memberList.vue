<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="20">
          <!-- <el-button class="filter-item" v-if="orgManager_btn_add" @click="handleCreate" type="primary" icon="edit">创建团队</el-button>
          <el-button class="filter-item" v-if="orgManager_btn_user" @click="handleUser()" type="success">
            <icon-svg icon-class="27"></icon-svg>编辑成员</el-button> -->
        </el-col>
        <!-- <el-col :span="6">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="团队名称" v-model="listQuery.orgName"> </el-input>
        </el-col> -->
        <el-col :span="4">
          <el-button class="filter-item" type="success" v-waves icon="plus" size="small">邀请新成员</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
