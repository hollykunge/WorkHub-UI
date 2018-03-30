<template>
  <!--项目详情页-->
  <div>
    <el-row justify="start">
      <el-col :span="10">
        <div class="index-project">
          <icon name="link"></icon>
          <el-button type="text">用户名</el-button>
          <icon name="long-arrow-right"></icon>
          <el-button type="text">项目名称</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="project-button-group">
          <el-button type="success" size="small" plain>浏览num_watches</el-button>
          <el-button type="warning" size="small" plain>收藏num_stars</el-button>
          <el-button type="danger" size="small" plain>下载num_forks</el-button>
        </div>
      </el-col>

    </el-row>
    <!-- <h1>项目详情页{{ $route.params.projectId }}</h1> -->
  </div>
</template>

<script>
export default {

}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/index.scss";
.index-project {
  padding: 12px;
  .fa-icon {
    font-size: 12px;
    color: #11181d9a;
  }
  .el-button {
    margin-left: -5px;
    font-size: 17px;
    line-height: 0;
    color: #20a19b;
    &:hover {
      color: #20a0ff;
    }
  }
}
.project-button-group {
  position: absolute;
  right: 18px;
  padding: 12px;
  .el-button {
    margin-left: 35px;
  }
}
</style>
