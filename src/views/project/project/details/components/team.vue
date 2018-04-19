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
            <el-button type="primary" size="small" @click="handleUpdateTeam(team)" plain>编辑</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="23" :sm="11" :md="7" :offset="1">
        <el-card class="card-create-team">
          <span class="tooltips" @click="handleCreateTeam">
            <icon name="plus"></icon>
            <a>
              <span>创建团队</span>
            </a>
          </span>
        </el-card>
      </el-col>
    </el-row>
    <!-- 创建团队对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="团队名称" prop="teamName">
          <el-input v-model="form.teamName" placeholder="请输入团队名称"></el-input>
        </el-form-item>
        <el-form-item label="团队负责人" prop="teamLeader">
          <el-select v-model="form.teamLeader" filterable remote placeholder="输入姓名进行搜索" :remote-method="remoteQueryUsers" :loading="loading" @change="isChanged" style="width: 100%">
            <el-option v-for="item in userItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.teamLeader!=undefined" label="添加成员" prop="teamMumbers" class="team-mumber-transfer">
          <el-transfer v-model="form.teamMumbers" :props="{key: 'id',label: 'name'}" :data="allUsers" :titles="['所有用户', '当前团队成员']" :button-texts="['移除成员', '添加成员']" @change="isChanged" filter-placeholder="输入姓名进行搜索" filterable>
          </el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">创 建</el-button>
        <el-button v-else-if="dialogStatus=='update'" type="primary" @click="update('form')">修 改</el-button>
        <el-button @click="cancel('form')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { page as userPage, all as userAll } from 'api/admin/user/index'
export default {
  data() {
    return {
      allTeams: [{ teamName: 'XX型号-XX任务组', teamLeader: 1, teamMumbers: [{ id: '1', name: 'hollykunge' }, { id: '6', name: '姬海南' }, { id: '9', name: '方法' }, { id: '9', name: '搜索' }, { id: '9', name: '嗯嗯' }, { id: '9', name: '天天' }, { id: '10', name: '二测试' }, { id: '15', name: '八等等' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-MM任务组', teamLeader: 1, teamMumbers: [{ id: '7', name: '王准忠' }, { id: '8', name: '姬航' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-TT任务组', teamLeader: 1, teamMumbers: [{ id: '9', name: '测试一' }, { id: '10', name: '试二' }], pdatesave: 3, ppageview: 3 },
      { teamName: 'XX型号-AA任务组', teamLeader: 1, teamMumbers: [{ id: '15', name: '测试八' }], pdatesave: 3, ppageview: 3 }],
      dialogFormVisible: false,
      form: {
        teamName: undefined,
        teamLeader: undefined,
        teamMumbers: []
      },
      rules: {
        teamName: {
          required: true,
          message: '团队名称不能为空'
        },
        teamLeader: {
          required: true,
          message: '请选择团队负责热'
        }
      },
      userItems: [],
      allUsers: [],
      listLoading: false,
      loading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined
      },
      transferDataChanged: false,
      total: null,
      dialogStatus: 'create',
      textMap: {
        update: '编辑团队信息',
        create: '创建团队'
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
    handleCreateTeam() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.getUserItems() // 为了能正常显示默认负责人
    },
    handleUpdateTeam(team) {
      this.form = team
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.getUserItems()
      this.userFliter(this.allUsers, team.teamLeader) // 有问题
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          // this.form.taskProjectId = this.projectId
          // addObj(this.form).then(() => {
          this.allTeams.push(this.form) // 新增一条数据
          this.dialogFormVisible = false
          //   this.getTaskByProIdExeId()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          // })
          //   } else {
          //     return false
        }
      })
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          // putObj(this.form.id, this.form).then(() => {
          this.dialogFormVisible = false
          this.getList()
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          //   })
          // } else {
          //   return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      // this.$refs[formName].resetFields()
    },
    getUserItems() {
      userAll().then(res => {
        this.userItems = res
        this.allUsers = res
      })
    },
    remoteQueryUsers(query) {
      if (query !== '') {
        this.loading = true
        this.loading = false
        userPage({
          name: query
        }).then(response => {
          this.userItems = response.data.rows
          this.loading = false
        })
      } else {
        this.userItems = []
      }
    },
    isChanged() {
      this.transferDataChanged = true
      this.allUsers.forEach(element => {
        element.disabled = false
      })
      this.userFliter(this.allUsers, this.form.teamLeader)
    },
    resetTemp() {
      this.form = {
        teamName: undefined,
        teamLeader: undefined,
        teamMumbers: []
      }
    },
    /* 对所有用户中包含的领导进行特殊处理 a：所有用户 Array b: 领导 String */
    userFliter(a, b) {
      for (let j = 0; j < a.length; j++) {
        if (a[j].id === b) {
          a[j].disabled = true
        }
      }
      return a
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
        top: -30px;
        left: -15px;
        width: 20em;
        height: 20em;
        font-size: 17px;
        background-color: #d8f3f8;
        color: rgb(21, 184, 29);
      }
    }
  }
}
.team-mumber-transfer {
  .el-form-item__content {
    line-height: initial;
  }
  .el-transfer {
    margin-left: 10%;
  }
}
</style>
