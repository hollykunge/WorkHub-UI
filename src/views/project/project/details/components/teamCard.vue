<template>
  <el-card class="card-box">
    <div slot="header">
      <span style="line-height: 36px;">任务一相关团队</span>
      <el-button style="float: right;" type="primary">编辑</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'teamCard',
  props: {
    teamList: {
      type: Array
    }
  },
  data() {
    return {
      test: undefined
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.card-box {
  height: 275px;
  width: 90%;
}
</style>
