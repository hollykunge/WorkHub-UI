<template>
  <el-dialog :visible.sync="visible" @close="handleClose" @open="handleOpen" :show="show" :close-on-click-modal="false" :show-close="false">
    <div slot="title" class="link-user-header">
      <icon name="link"></icon>
      <b>编辑团队成员</b>
    </div>
    <div class="link-user-body">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
          <el-tree :data="orgTree" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterOrgNode" ref="orgTree" highlight-current></el-tree>
        </el-col>
        <el-col :span="14">
          <el-row>
            <el-col>
              <el-input placeholder="输入姓名进行搜索" v-model="listQuery.name" @keyup.enter.native="filterUser" size="small"></el-input>
              <el-table :data="orgUsers" ref="usersTable" @select="handleSelect" :max-height="300" empty-text="暂无用户数据，请确认已选择组织" :show-header="false">
                <el-table-column>
                  <template scope="scope">
                    <el-button size="small" type="text" plain>
                      <icon name="user-o"></icon>
                      {{scope.row.name}}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template scope="scope">
                    <el-button size="small" type="text" plain>
                      <icon name="check-circle-o"></icon>
                      {{scope.row.telPhone}}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column type="selection"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="selected-users">
                <span class="lable">已选用户:</span>
                <el-tag v-for="tag in userSelected" :key="tag.id" @close="handleTagClose(tag)" :close-transition="false" :closable="true" type="primary">{{tag.name}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div slot="footer" class="link-user-footer">
      <el-button type="primary" size="small" @click="handleLink">关联已选用户</el-button>
      <el-button size="small" @click="visible=false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { all as getAllOrg, getUsers as getOrgUsers } from 'api/admin/organize/index'
import { page as queryUser } from 'api/admin/user/index'
import { modifyTeamUsers } from 'api/project/team/index'
export default {
  name: 'linkUser',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    teamId: {
      type: Number
    }
  },
  data() {
    return {
      visible: this.show,
      filterText: '',
      orgTree: [{
        orgname: '中国航天科工集团第二研究院',
        children: [{
          orgname: '第二总体设计部',
          children: []
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'orgname'
      },
      orgUsers: [],
      userSelected: [],
      listQuery: { name: undefined }
    }
  },
  computed: {},
  created() { },
  mounted() { },
  watch: {
    show() { this.visible = this.show },
    filterText(val) { this.$refs.orgTree.filter(val) },
    userSelected() { this.filterSelection() }
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false) // 保证对话框正常打开和关闭
    },
    handleOpen() {
      getAllOrg().then(res => {
        this.orgTree[0].children[0].children = res
      })
      // 通过teamId获取当前的成员，存到userSelected中
      // const vals = {}
      modifyTeamUsers(this.teamId, [7]).then(res => {
        console.log('---------')
        console.log(res)
      })
    },
    filterOrgNode(value, data) { // 筛选组织树节点
      if (!value) return true
      return data.orgname.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      if (data.id === undefined) return false
      getOrgUsers(data.id).then(res => {
        const users = [...res.data.members, ...res.data.leaders]
        this.orgUsers = users
      }).then(() => {
        this.filterSelection()
      })
    },
    handleTagClose(tag) {
      this.userSelected.splice(this.userSelected.indexOf(tag), 1)
    },
    handleSelect(selection, row) {
      let flag = 0 /* 1 => add ; 0 => remove*/
      for (const i in selection) {
        if (row.id === selection[i].id) {
          flag = 1
          break
        }
      }
      if (flag === 1) {
        this.userSelected.push(row)
      } else {
        for (const i in this.userSelected) {
          if (this.userSelected[i].id === row.id) {
            this.userSelected.splice(i, 1)
          }
        }
      }
    },
    handleLink() {
      // console.log(this.userSelected)
      modifyTeamUsers(this.teamId, this.userSelected).then(res => {
        console.log('---------')
        console.log(res)
      })
    },
    /* ----------------------------------------------------------------- */
    filterUser() {
      queryUser(this.listQuery).then(res => { this.orgUsers = res.data.rows }).then(() => { this.filterSelection() })
    },
    filterSelection() {
      if (this.userSelected.length !== 0) {
        this.$refs.usersTable.clearSelection()
        for (const i in this.userSelected) {
          this.orgUsers.forEach(element => {
            if (element.id === this.userSelected[i].id) {
              this.$refs.usersTable.toggleRowSelection(element, true)
            }
          })
        }
      } else { this.$refs.usersTable.clearSelection() }
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.link-user-header {
  text-align: center;
}
.link-user-body {
  .el-table__body-wrapper {
    overflow-x: hidden;
  }
  .selected-users {
    border: 1px solid #20a0ff;
    border-radius: 4px;
    margin-top: 20px;
    padding: 10px 20px;
    .lable {
      position: absolute;
      margin: -10px -15px;
    }
    span {
      margin: 10px;
    }
  }
}
</style>
