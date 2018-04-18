<template>
  <div class="project-team-cards">
    <el-row>
      <el-col :xs="23" :sm="11" :md="7" v-for="(team,index) in allTeams" :key="index" :offset="1">
        <div>
          <el-card class="card-content">
            <div slot="header" class="card-content-header">
              <span style="line-height: 20px;">{{ team.teamName }}</span>
              <el-button v-if="!isCurrentMember(team.teamMumbers)" @click="handleJoin" style="float: right;" type="primary" size="small">加入</el-button>
              <el-button v-if="isCurrentMember(team.teamMumbers)" @click="handleLeaf" style="float: right;" type="danger" size="small">离开</el-button>
            </div>
            <div class="card-content-body" style="">
              <Avatar v-for="(user, index) in team.teamMumbers" :username="user.name" :size="45" :lighten="200" :key="index" style="margin-right: 5px;"></Avatar>
            </div>
          </el-card>
          <div class="card-content-footer">
            <el-button type="primary" size="small" plain>编辑</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="23" :sm="11" :md="7" :offset="1">
        <el-card class="card-create-team">
          <span class="tooltips">
            <icon name="plus"></icon>
            <span>创建团队</span>
          </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      allTeams: [{ teamName: 'XX型号-XX任务组', teamMumbers: [{ id: '1', name: 'hollykunge' }, { id: '6', name: '姬海南' }, { id: '9', name: '方法' }, { id: '9', name: '搜索' }, { id: '9', name: '嗯嗯' }, { id: '9', name: '天天' }, { id: '10', name: '二测试' }, { id: '15', name: '八等等' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-MM任务组', teamMumbers: [{ id: '7', name: '王准忠' }, { id: '8', name: '姬航' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-TT任务组', teamMumbers: [{ id: '9', name: '测试一' }, { id: '10', name: '试二' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-AA任务组', teamMumbers: [{ id: '15', name: '测试八' }], pdatesave: 3, ppageview: 3 }],
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
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
  },
  methods: {
    isCurrentMember(arr) { // 传去一个团队成员的数组
      if (arr.length === 0) {
        return false
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.userId) {
          return true
        }
      }
      return false
    },
    handleJoin() {
      console.log('加入团队')
    },
    handleLeaf() {
      this.$confirm('确定离开?', '提示', {
        confirmButtonText: '离开',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        console.log('离开团队')
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.getList()
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
      height: 159px;
      padding: 0px;
      .el-card__body {
        border-bottom: 1px solid #d1dbe5;
        height: 70px;
        overflow-x: auto;
        overflow-y: hidden;
      }
      &-body {
        display: inline-flex;
        margin-top: -13px;
      }
    }
    .card-content-footer {
      margin-top: -30px;
      float: right;
      margin-right: 20px;
    }
    .card-create-team {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      background: #3ac3da33;
      margin: 8%;
      .tooltips {
        position: relative; /*这个是关键*/
        z-index: 2;
        .fa-icon {
          font-size: 40px;
          margin: 10%;
          color: #20a0ffc4;
        }
        :hover {
          z-index: 3;
          color: rgb(21, 184, 29);
        }
      }
      .tooltips:hover {
        z-index: 3;
        background: none;
      }
      .tooltips span {
        display: none;
      }
      .tooltips:hover span {
        display: block;
        position: absolute;
        top: -28px;
        left: -10px;
        width: 20em;
        height: 20em;
        background-color: #d8f3f8;
        color: rgb(21, 184, 29);
      }
    }
  }
}
</style>
