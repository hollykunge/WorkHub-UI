<template>
  <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">卡片名称</span>
        <el-button style="float: right;" type="primary">操作按钮</el-button>
      </div>
      <div v-for="o in 7" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">卡片名称</span>
        <el-button style="float: right;" type="primary">操作按钮</el-button>
      </div>
      <div v-for="o in 7" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">卡片名称</span>
        <el-button style="float: right;" type="primary">操作按钮</el-button>
      </div>
      <div v-for="o in 7" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">卡片名称</span>
        <el-button style="float: right;" type="primary">操作按钮</el-button>
      </div>
      <div v-for="o in 7" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card> -->
  <div class="project-team-cards">
    <el-row>
      <el-col :xs="23" :sm="11" :md="7" v-for="(project,index) in allprojects" :key="index" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="card-content">
            <!--  -->
            <div>
              <div>
                <font size="5">{{project.pcname}}</font>
              </div>
              <div style="position: relative;top: 15px;text-align: center;">{{project.pname}}</div>
            </div>
            <div style="position: relative;top: 30px;">
              <!-- <img src="../../../../../../static/images/logo-min.png" class="image"> -->
              <div style="position: relative;top: 10px;left: 66px;">
                <i class="el-icon-time"></i>{{project.pdatesave}}</div>
            </div>
            <div style="position: relative;top: 45px;">
              &nbsp;&nbsp;
              <i class="el-icon-view"></i>
              <span>{{project.ppageview}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="text">
                <font size="4">查看</font>
              </el-button>
            </div>
            <!--   -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import teamCard from './teamCard'
export default {
  components: { teamCard },
  data() {
    return {
      allprojects: [{ pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 },
      { pcname: 1, pname: 2, pdatesave: 3, ppageview: 3 }],

      teamList: undefined,
      listLoading: false,
      currentTeamDetail: {
        team1: undefined,
        team2: undefined,
        team3: undefined,
        team4: undefined,
        team5: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined
      },
      total: null,
      dialogStatus: 'create',
      textMap: {
        check: '团队详细信息',
        update: '编辑团队信息',
        create: '创建新的团队'
      },
      allUser: undefined,
      currentTeamNum: undefined
    }
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.limit = val
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.getList()
    },
    /* 表单数据重置 */
    resetTemp() {
      this.currentTeamDetail = {
        team1: undefined,
        team2: undefined,
        team3: undefined,
        team4: undefined,
        team5: undefined
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.project-team-cards {
  margin: 20px;
  .el-col {
    margin-bottom: 40px;
    .el-card {
      // width: 260px;
      height: 210px;
      padding: 0px;
      .card-content {
        padding: 6px;
        height: 310px;
      }
    }
  }
}
</style>
