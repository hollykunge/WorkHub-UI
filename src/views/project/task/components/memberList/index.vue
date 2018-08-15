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
          <el-table-column align="center" label="序号" type="index" width="150"></el-table-column>
          <el-table-column align="center" label="用户">
            <template scope="scope">
              <el-button type="text">
                <icon name="user"></icon>&nbsp;
                <span>{{ scope.row.userName }}</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="权限">
            <template scope="scope">
              <el-popover ref="permission" placement="right" width="160" v-model="popoverVisible">
                <el-rate v-model="scope.row.permission" show-text :texts="['只读', '执行', '管理']" :max="3"></el-rate>

                <span>
                  <el-button @click="popoverVisible = false" size="small">关闭</el-button>
                  <el-button @click="update(scope.row)" size="small" type="primary">确定修改</el-button>
                </span>
              </el-popover>
              <el-tooltip content="单击修改权限" placement="top" effect="dark">
                <el-button :type="scope.row.permission==200? 'success':'warning'" v-popover:permission class="authrioty-button" size="small">
                  <icon name="key"></icon>&nbsp;
                  <span>{{ scope.row.permission }}</span>
                </el-button>
              </el-tooltip>
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
    <div class="list-dialog-box">
      <link-user :show.sync="dialogVisible"></link-user>
      <el-dialog title="修改权限权限" :visible.sync="modifyVisible" top="20%" :close-on-click-modal="false">
        <el-form :model="form" label-position="right" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="form.authrioty" style="width: 100%">
              <el-option v-for="item in authriotyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.role" style="width: 100%">
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="modifyVisible = false" size="small">关闭</el-button>
          <el-button @click="update('form')" size="small" type="primary">确定修改</el-button>
        </span>
      </el-dialog>
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
      selectedOrg: [],
      userlist: [{ name: '姬海南' }],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      modifyVisible: false,
      form: {
        name: undefined,
        authrioty: 100,
        role: 100
      },
      authriotyOptions: [{ label: '只读', value: 100 }, { label: '读/写', value: 200 }],
      roleOptions: [{ label: '设计师', value: 100 }, { label: '调度', value: 101 }, { label: '总师', value: 102 }]
    }
  },
  computed: {
  },
  created() {
    this.listQuery.taskId = this.taskId
    this.getMumberList()
    // associateUser({taskId: '20',userId: '1', userName: 'hollykunge', taskName: '测试项目0813/测试任务0813.git', permission: '0'}).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    getMumberList() {
      getTaskMember(this.listQuery).then(res => {
        this.memberList = res.data.rows
        this.total = res.data.total
        console.log(res)
      })
    },
    handleTabClick() {
      console.log('-----')
      this.$emit('toggleStatus')
    },
    // 处理邀请成员点击事件的方法
    handleInvite() {
      this.dialogVisible = true
    },
    handleCascaderChange(value) {
      console.log(value)
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
      this.modifyVisible = true
      this.form = row
    },
    update(row) {
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
