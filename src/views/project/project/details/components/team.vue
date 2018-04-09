<template>
  <div class="project-team-list">
    <el-row>
      <el-col :span="10" class="team-list">
        <div class="team-header">
          <p>团队列表</p>
        </div>
        <el-table :data="teamList" v-loading.body="listLoading" border empty-text="暂无团队数据" fit style="width: 100%">
          <el-table-column align="center" label="团队名称" prop="teamName"></el-table-column>
          <el-table-column align="center" label="负责人" prop="teamLeader"></el-table-column>
          <el-table-column align="center" label="创建时间" prop="teamCrtTime"></el-table-column>
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
      </el-col>
      <el-col :span="2" class="team-edit-button-group">
        <div>
          <el-button type="success" icon="plus">创建</el-button>
          <!-- 点击创建以后该按钮和编辑不可用，等创建完毕后再恢复 -->
        </div>
        <div>
          <el-button type="success" icon="edit">编辑</el-button>
          <!-- 点击创建以后该按钮和创建不可用，等创建完毕后再恢复 -->
        </div>
      </el-col>
      <el-col :span="12" class="team-detail">
        <div class="team-header">
          <p>{{ textMap[dialogStatus]}}</p>
        </div>
        <div class="team-detail-container">
          <el-form :model="currentTeamDetail" class="team-detail-container-form" label-width="110px">
            <el-form-item label="团队名称">
              <el-input v-model="currentTeamDetail.team1" placeholder="请设置您的团队名称"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" v-if="dialogStatus == 'check'">
              <el-date-picker v-model="currentTeamDetail.team2" type="datetime" placeholder="选择日期时间" readonly></el-date-picker>
            </el-form-item>
            <el-form-item label="团队领导">
              <el-input v-model="currentTeamDetail.team3" placeholder="请选择您团队的领导"></el-input>
              <!--设计成可以搜索的输入框-->
            </el-form-item>
            <el-form-item label="成员列表" v-if="dialogStatus == 'check'">
              <!--当为编辑和新增模式时显示transfer穿梭框-->
              <el-table :data="currentTeamDetail.team4" empty-text="您的团队还没有成员" border fit>
                <el-table-column label="姓名"></el-table-column>
                <el-table-column label="单位"></el-table-column>
                <el-table-column label="联系方式"></el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="请选择团队成员" v-if="dialogStatus != 'check'" style="margin-left: 6%">
              <el-transfer v-model="allUser" :data="currentTeamNum" filter-placeholder="输入姓名进行搜索" filterable :button-texts="['添加到本组','从本组移除']" :titles="['所用用户','当前团队成员']"></el-transfer>
            </el-form-item>
            <el-form-item style="margin-left: 55%">
              <el-button type="success">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- <el-col :span="12" class="team-detail" v-show="isCreate">
        <div class="team-header new-team">
          <p>创建新的团队</p>
        </div>
      </el-col> -->
    </el-row>
  </div>
  <!-- <div class="project-team-list">
    <el-row justify="center" align="top" gutter="10">

    </el-row>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      teamList: undefined,
      listLoading: false,
      // isCreate: false,
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
.team-header {
  p {
    font-size: large;
    text-align: center;
    margin-top: 3px;
    margin-bottom: 8px;
    color: #20a0ff;
  }
}
.team-edit-button-group {
  text-align: center;
  margin-top: 2%;
  :last-child {
    margin-top: 5%;
  }
  button {
    padding: 8px 25px;
  }
}
.team-detail-container {
  background: #eef1f669;
  &-form {
    margin-left: 3%;
    margin-right: 10%;
    padding-top: 2%;
  }
}
.pagination-container {
  text-align: center;
}
</style>
