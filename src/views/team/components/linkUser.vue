<template>
  <el-dialog :visible.sync="visible" @close="handleClose" @open="handleOpen" :show="show" :close-on-click-modal="false" :show-close="false">
    <div slot="title" class="link-user-header">
      <icon name="link"></icon>
      <b>关联用户</b>
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
              <!-- 这个搜索要写成对全部用户的搜索 -->
              <el-input placeholder="输入姓名进行搜索" v-model="listQuery.name" @keyup.enter.native="FilterUser" size="small"></el-input>
              <el-table :data="orgUsers" @select="handleSelect" :max-height="300" empty-text="暂无用户数据，请确认已选择组织" :show-header="false">
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
                      {{scope.row.role}}
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
                <el-tag v-for="tag in userSelected" :key="tag.id" @close="handleTagClose(tag)" :close-transition="false" :closable="true" type="primary">{{tag.name}}/{{tag.org}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div slot="footer" class="link-user-footer">
      <el-button type="primary" size="small">关联已选用户</el-button>
      <el-button size="small" @click="visible=false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { all as getAllOrg, getUsers as getOrgUsers } from 'api/admin/organize/index'
import { page as queryUser } from 'api/admin/user/index'
import { } from 'api/project/team/index'
export default {
  name: 'linkUser',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      filterText: '',
      orgTree: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1',
            id: 123
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      orgUsers: [{ id: '1', name: '王大', org: '三室', role: '设计师' }, { id: '5', name: '孙福', org: '二室', role: '主任' }],
      userSelected: [{ id: '1', name: '王大', org: '三室' }, { id: '2', name: '李二', org: '五室' }, { id: '3', name: '白瞎', org: '一室' }],
      listQuery: {
        name: undefined
      }
    }
  },
  computed: {},
  created() { },
  mounted() { },
  watch: {
    show() { this.visible = this.show },
    filterText(val) { this.$refs.orgTree.filter(val) }
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false) // 保证对话框正常打开和关闭
    },
    handleOpen() {
      this.generateOrgTree()
    },
    filterOrgNode(value, data) { // 筛选组织树节点
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    FilterUser() {
      // this.listLoading = true
      queryUser(this.listQuery)
        .then(res => {
          console.log(res)
          // this.list = response.data.rows
          // this.total = response.data.total
          // this.listLoading = false
        })
    },
    handleNodeClick(data) {
      if (data.id === undefined) return false
      console.log(data.id)
      getOrgUsers(data.id).then(res => {
        console.log('获取当前组织的人员开始---')
        console.log(res)
        console.log('获取当前组织的人员结束---')
      })
    },
    handleTagClose(tag) {
      this.userSelected.splice(this.userSelected.indexOf(tag), 1)
      console.log(tag)
    },
    handleSelect(selection, row) { // selection是目前选择的所有，row为当前值
      console.log(selection)
      console.log(row)
    },
    /* ----------------------------------------------------------------- */
    generateOrgTree() {
      getAllOrg().then(res => {
        console.log(res)
      })
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
