<template>
  <div class="task-member-list">
    <div class="list-header">
      <el-row type="flex" justify="start">
        <el-col>
          <div class="add-mumber-button">
            <el-button type="success" v-waves icon="plus" size="small" @click="handleInvite">邀请新成员</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list-body">
      <div>
        <el-table :data="memberList" v-loading.body="listLoading" empty-text="无参与成员" fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号" type="index" header-align="center" width="250"></el-table-column>
          <el-table-column align="left" header-align="center" label="用户" width="150">
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
                <el-rate v-model="listQuery.page" show-text :texts="['只读', '执行', '管理']" :max="3"></el-rate>
                <span>
                  <el-button @click="popoverVisible = false" size="small">关闭</el-button>
                  <el-button @click="handleUpdate(scope.row)" size="small" type="primary">确定修改</el-button>
                </span>
                <div slot="reference">
                <el-tooltip content="单击修改权限" placement="top" effect="dark">
                  <el-button :type="scope.row.permission==200? 'success':'warning'" class="authrioty-button" size="small">
                    <icon name="key"></icon>&nbsp;
                    <span>{{ scope.row.permission }}</span>
                  </el-button>
                </el-tooltip>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <el-button type="danger" size="small" @click="handleDelete(scope.row)" plain>移除成员</el-button>
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
      <link-user @confirmed="handleAddUser" :show.sync="dialogVisible"></link-user>
    </div>
  </div>
</template>

<script>
import linkUser from 'views/team/components/linkUser'
import { getTaskMember, associateUser, modifyMemberPermission, deleteMember } from 'api/project/task/taskMember'

export default {
  props: ['projectId', 'taskId'],
  components: { linkUser },
  data() {
    return {
      memberList: [],
      dialogVisible: false,
      popoverVisible: false,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
    }
  },
  computed: {
  },
  created() {
    this.listQuery.taskId = this.taskId
    this.getMumberList()
  },
  methods: {
    getMumberList() {
      getTaskMember(this.listQuery).then(res => {
        this.memberList = res.data.rows
        this.total = res.data.total
        console.log(res)
      })
    },
    // 处理邀请成员点击事件的方法
    handleInvite() {
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
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMember(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.memberList.indexOf(row) // 删除列表中对应的项
          this.memberList.splice(index, 1)
        })
      })
    },
    handleUpdate(row) {
      this.popoverVisible = false
      modifyMemberPermission(row.id, row).then(() => {
        this.popoverVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleAddUser(val) {
      associateUser(this.taskId, { userIds: val.join() }).then(res => {
        this.dialogVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
        console.log(res)
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
