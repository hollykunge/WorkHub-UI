<template>
  <div class="task-member-list">
    <div class="list-header">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="4" :offset="20">
          <el-button class="filter-item" type="success" v-waves icon="plus" size="small" @click="handleInvite">邀请新成员</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="list-body">
      <el-table :data="memberList" :show-header="false" v-loading.body="listLoading" empty-text="当前任务无成员" fit highlight-current-row style="width: 100%">
        <el-table-column align="center">
          <template scope="scope">
            <el-button type="text">
              <icon name="user"></icon>
              <span>{{ scope.row.name }}/{{ scope.row.orgName }}</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <icon name="key"></icon>
            <span>{{ scope.row.authrioty }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <icon name="drivers-license-o"></icon>
            <span>{{ scope.row.role }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <el-button type="primary" size="small" @click="handleUpdate(scope.row)" plain>修改权限</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import linkUser from '../../../team/components/linkUser'
export default {
  components: { linkUser },
  data() {
    return {
      memberList: [{ name: '姬海南', orgName: '十一室', authrioty: '读写', role: '设计师' }],
      dialogVisible: false,
      orgTree: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }],
      selectedOrg: [],
      userlist: [{ name: '姬海南' }],
      listLoading: false,
      listQuery: {
        page: undefined,
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
  },
  methods: {
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
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.getList()
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // delObj(row.id).then(() => {
        //   this.$notify({
        //     title: '成功',
        //     message: '删除成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        //   const index = this.list.indexOf(row) // 删除列表中对应的项
        //   this.list.splice(index, 1)
        // })
      })
    },
    handleUpdate(row) {
      this.modifyVisible = true
      this.form = row
    },
    update(formName) {
      // const set = this.$refs
      // set[formName].validate(valid => {
      //   if (valid) {
      this.modifyVisible = false
      // putObj(this.form.id, this.form).then(() => {
      //   this.dialogFormVisible = false
      //   this.getList()
      this.$notify({
        title: '成功',
        message: '修改成功',
        type: 'success',
        duration: 2000
      })
      //   })
      // } else {
      //   return false
      //   }
      // })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-member-list {
  .list-header {
    margin-bottom: 10px;
  }
  // .el-dialog__body {
  //   text-align: center;
  //   .el-table {
  //     width: 80%;
  //     margin-left: 13%;
  //     margin-top: 20px;
  //   }
  // }
}
</style>
