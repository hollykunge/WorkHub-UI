<template>
  <div class="task-member-list">
    <div class="list-header">
      <el-row type="flex" justify="start">
        <el-col>
          <div class="add-mumber-button">
            <el-button type="success" v-waves icon="edit" size="small" @click="handleInvite">修改成员</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list-body">
      <div>
        <el-table :data="memberList" v-loading.body="listLoading" empty-text="无参与成员" fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号" type="index" header-align="center" width="500"></el-table-column>
          <el-table-column align="left" label="用户" width="200">
            <template scope="scope">
              <el-button type="text">
                <icon name="user"></icon>&nbsp;
                <span>{{ scope.row.userName }}</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="权限">
            <template scope="scope">
              <el-popover ref="permission" placement="top" width="160">
                <el-rate v-model="scope.row.permission" @change="handleUpdate(scope.row)" show-text :texts="['查看', '只读', '读写', '管理']" :colors="['#99A9BF', '#F7BA2A', '#20d220']" :max="4" :low-threshold="1" :high-threshold="4"></el-rate>
                <div slot="reference">
                  <el-tooltip content="点击修改权限" placement="right" effect="dark">
                    <el-button :type="getButtonType(scope.row.permission)" class="authrioty-button" size="small" plain>
                      <icon name="key"></icon>&nbsp;
                      <span>{{ getPermissionText(scope.row.permission) }}</span>
                    </el-button>
                  </el-tooltip>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="list-footer">
      <el-row type="flex" justify="center">
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 邀请新成员对话框 -->
    <div class="list-dialog-box">
      <link-user @confirmed="handleAddUser" :userSelected="userSelected" :show.sync="dialogVisible"></link-user>
    </div>
  </div>
</template>

<script>
import linkUser from 'views/team/components/linkUser'
import { getTaskMember, associateUser, modifyMemberPermission, deleteMember } from 'api/project/task/taskMember'
import { getObj } from 'api/project/task/index'

export default {
  props: ['projectId', 'taskId'],
  components: { linkUser },
  data() {
    return {
      memberList: [],
      dialogVisible: false,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      originSelected: [], // 未更改前的成员列表
      userSelected: [],
      taskName: undefined
    }
  },
  computed: {
  },
  created() {
    this.listQuery.taskId = this.taskId
    this.getMumberList()
    getObj(this.taskId).then(res => {
      this.taskName = res.data.taskName
    })
  },
  methods: {
    getMumberList() {
      this.memberList = []
      getTaskMember(this.listQuery).then(res => {
        const tempList = res.data.rows
        tempList.forEach(element => {
          const permission = parseInt(element.permission) + 1
          element.permission = permission
        })
        this.memberList = tempList
        this.total = res.data.total
      })
    },
    // 处理邀请成员点击事件的方法
    handleInvite() {
      this.userSelected = []
      if (this.total > this.listQuery.limit) {
        const query = {}
        query.taskId = this.taskId
        query.limit = this.total
        query.page = 1
        getTaskMember(query).then(res => {
          this.originSelected = res.data.rows
          this.getUserSelected(res.data.rows)
        })
      } else {
        this.originSelected = this.memberList
        this.getUserSelected(this.memberList)
      }

      this.dialogVisible = true
    },
    // 还要有一个判断当前用户是否已经在该小组的方法
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getMumberList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getMumberList()
    },
    handleUpdate(row) {
      const _row = {}
      _row.id = row.id
      _row.permission = row.permission - 1
      _row.taskId = row.taskId
      _row.taskName = row.taskName
      _row.userId = row.userId
      _row.userName = row.userName

      modifyMemberPermission(_row).then(() => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleAddUser(val) {
      // 生成后台的数据格式
      let data = [] // 向后台传的数据
      for (let i = 0; i < val.length; i++) {
        const item = val[i]
        let detectionResult = this.originSelected.filter(element => element.userId === item.id)
        if (detectionResult.length) { // 原本已经存在的成员
          const result = {}
          result.id = detectionResult[0].id
          result.permission = item.permission - 1
          result.taskId = detectionResult[0].taskId
          result.taskName = detectionResult[0].taskName
          result.userId = detectionResult[0].userId
          result.userName = detectionResult[0].userName

          data.push(result)
        } else {
          const obj = {}
          obj.userId = item.id
          obj.userName = item.name
          obj.permission = item.permission - 1
          obj.taskId = this.taskId
          obj.taskName = this.taskName
          data.push(obj)
        }
      }

      associateUser(this.taskId, data).then(res => {
        this.getMumberList()
        this.dialogVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    getPermissionText(val) {
      switch (val) {
        case 1:
          return '查看'
          break
        case 2:
          return '只读'
          break
        case 3:
          return '读写'
          break
        case 4:
          return '管理'
          break
      }
    },
    getButtonType(val) {
      switch (val) {
        case 1:
          return 'danger'
          break
        case 2:
          return 'warning'
          break
        case 3:
          return 'info'
          break
        case 4:
          return 'success'
          break
      }
    },
    getUserSelected(val) {
      val.forEach(item => {
        const userItem = {}
        userItem.id = item.userId
        userItem.name = item.userName
        if (this.total > this.listQuery.limit) {
          userItem.permission = parseInt(item.permission) + 1
        } else {
          userItem.permission = item.permission
        }

        this.userSelected.push(userItem)
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-member-list {
  .list-header {
    margin-bottom: 16px;
    .add-mumber-button {
      position: absolute;
      right: 18px;
      padding-right: 12px;
    }
  }
  .list-body {
    margin: 44px 30px 0 20px;
  }
  .authrioty-button {
    padding: 5px 8px;
  }
}
</style>
