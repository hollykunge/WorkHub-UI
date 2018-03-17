<template>
  <div class="app-container calendar-list-container">
    <el-row type="flex" justify="end">
      <div class="filter-container">
        <el-input class="filter-item" style="width: 200px;" placeholder="请输入要搜索的组织名称"> </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="search">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="plus">添加</el-button>
      </div>
    </el-row>
    <el-table :data="orgList" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="" width="">
        <template></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrgList } from 'api/admin/organize/index'
export default {
  data() {
    return {
      orgList: [],
      total: 0,
      listLoading: true
    }
  },
  components: {

  },
  methods: {
    getOrgList() {
      this.listLoading = true
      getOrgList().then(res => {
        console.log(res)
        this.orgList = res.data.rows
        this.total = res.data.total
        this.listLoading = false
      })
    }
  },
  computed: {

  },
  mounted() {
    this.getOrgList()
  }
}
</script>

<style>

</style>
