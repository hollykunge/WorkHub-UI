<template>
  <div class="project-team-cards">
    <el-row>
      <el-col :xs="23" :sm="11" :md="7" v-for="(team,index) in allTeams" :key="index" :offset="1">
        <div>
          <el-card class="card-content">
            <div slot="header" class="card-content-header">
              <span style="line-height: 20px;">{{ team.teamName }}</span>
              <el-button v-if="!currentMember" style="float: right;" type="primary" size="small">加入</el-button>
              <!-- 需要写一个点击的方法，点击后弹框询问是否确定当前操作 -->
              <!-- v-if需要绑定一个方法，参数为当前用户id和当前团队成员，返回true或false -->
              <el-button v-if="currentMember" style="float: right;" type="danger" size="small">离开</el-button>
            </div>
            <div class="card-content-body" style="display: inline-flex;">
              <Avatar v-for="(user, index) in team.teamMumbers" :username="user.name" :size="45" :lighten="200" :key="index" style="margin-right: 5px;"></Avatar>
            </div>
          </el-card>
          <div class="card-content-footer">
            <!-- <p>这里显示对团队的操作</p> -->
            <el-button type="primary" size="small" plain>编辑</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allTeams: [{ teamName: 'XX型号-XX任务组', teamMumbers: [{ id: '1', name: 'hollykunge' }, { id: '6', name: '姬海南' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-MM任务组', teamMumbers: [{ id: '7', name: '王准忠' }, { id: '8', name: '姬航' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-TT任务组', teamMumbers: [{ id: '9', name: '测试一' }, { id: '10', name: '测试二' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-LL任务组', teamMumbers: [{ id: '11', name: '测试三' }, { id: '12', name: '测试四' }], pdatesave: 3, ppageview: 3 },
      // { teamName: 'XX型号-PP任务组', teamMumbers: [{ id: '13', name: '测试五' }, { id: '14', name: '测试六' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-AA任务组', teamMumbers: [{ id: '15', name: '测试八' }], pdatesave: 3, ppageview: 3 }],
      currentMember: false, // 需要写一个判断当前用户是否属于某一个团队成员的方法，返回值为true/false
      teamList: undefined,
      listLoading: false,
      currentTeamDetail: {
        team1: undefined,
        team2: undefined,
        team3: undefined,
        team4: undefined,
        team5: undefined
      },
      test: '123',
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
  created() {
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
    .card-content {
      // width: 260px;
      height: 160px;
      padding: 0px;

      .el-card__body {
        border-bottom: 1px solid #d1dbe5;
        height: 70px;
      }
      &-body {
        // background-color: chartreuse;
      }
    }
    .card-content-footer {
      margin-top: -30px;
      float: right;
      margin-right: 20px;
    }
  }
}
</style>
