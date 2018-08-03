<template>
  <el-row>
    <el-col :span="24">
      <el-button type="primary" v-if="groupManager_menu" @click="update">保存</el-button>
    </el-col>
    <el-col :span="8" style='margin-top:15px;'>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
      <el-tree class="filter-tree" check-strictly :node-key="getTreeNodeKey" :data="treeData" show-checkbox node-key="id" highlight-current :props="defaultProps" :filter-node-method="filterNode" ref="menuTree" @node-click="getNodeData" default-expand-all>
      </el-tree>
    </el-col>
    <el-col :span="16" style='margin-top:15px;'>
      <el-table ref="elementTable" :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
        <el-table-column align="center" label="资源编码">
          <template scope="scope">
            <span>
              {{scope.row.code}}</span>
          </template>

        </el-table-column>
        <el-table-column align="center" label="类型">
          <template scope="scope">
            <span>
              {{scope.row.type}}</span>
          </template>

        </el-table-column>
        <el-table-column align="center" label="名称">
          <template scope="scope">
            <span>
              {{scope.row.name}}</span>
          </template>

        </el-table-column>
        <el-table-column align="center" label="地址">
          <template scope="scope">
            <span>
              {{scope.row.uri}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="请求类型">
          <template scope="scope">
            <span>
              {{scope.row.method}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="groupManager_element" width="80px" align="center" fixed="right" label="操作">
          <template scope="scope">
            <el-button v-if="scope.row.hasPermission" @click="handleRemoveElementAuthority(scope.row.id)" type="danger" size="small">取消</el-button>
            <el-button v-if="!scope.row.hasPermission" @click="handleAddElementAuthority(scope.row.id)" type="success" size="small">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

  </el-row>
</template>
<script>
import { fetchTree } from 'api/admin/menu/index';
import { page } from 'api/admin/element/index';
import { removeElementAuthority, addElementAuthority, getElementAuthority, modifyMenuAuthority, getMenuAuthority } from 'api/admin/group/index';
import { mapGetters } from 'vuex';
export default {
  name: 'menu',
  props: {
    groupId: {
      default: undefined
    }
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      groupManager_menu: false,
      groupManager_element: false
      //   currentId: -1
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.groupManager_menu = this.elements['groupManager:menu'];
    this.groupManager_element = this.elements['groupManager:element'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data;
        this.initAuthoritys();
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      this.listLoading = true;
      this.listQuery.menuId = data.id;
      page(this.listQuery).then(response => {
        const authList = response.data.rows;
        getElementAuthority(this.groupId).then(data => {
          const authArray = data.data;
          for (let i = 0; i < authList.length; i++) {
            if (authArray.some(elemennt => elemennt === authList[i].id)) {
              authList[i].hasPermission = true;
            } else {
              authList[i].hasPermission = false;
            }
          }
          this.list = authList;
          this.listLoading = false;
        });
      });
      this.currentId = data.id;
      this.showElement = true;
    },
    handleAddElementAuthority(elementId) { // 添加权限
      addElementAuthority(this.groupId, {
            menuId: this.currentId,
            elementId: elementId
          }).then(() => {
            this.list.filter(element => {
              if (element.id === elementId) {
                element.hasPermission = true
              }
            });
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
          });
    }, 
    handleRemoveElementAuthority(elementId) { // 取消权限
      removeElementAuthority(this.groupId, {
          menuId: this.currentId,
          elementId: elementId
        }).then(() => {
          this.list.filter(element => {
            if (element.id === elementId) {
              element.hasPermission = false
            }
          });
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
    },
    getTreeNodeKey(node) {
      return node.id;
    },
    update() { // 用于保存菜单
      this.$emit('closeAuthorityDialog');
      const nodes = this.$refs.menuTree.getCheckedNodes();
      const ids = [];
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id);
      }
      modifyMenuAuthority(this.groupId, {
        menuTrees: ids.join()
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        });
      });
    },
    initAuthoritys() {
      getMenuAuthority(this.groupId).then(data => {
        const result = [];
        for (let i = 0; i < data.data.length; i++) {
          result.push(data.data[i].id);
        }
        this.$refs.menuTree.setCheckedKeys(result);
      });
    }
  }
}
</script>
