<template>
  <!-- 切换分支的公共组件 -->
  <!-- 需要为组件传一个所有分支的数组 branches -->
  <!-- 当选择分支时触发 changed 事件，通过监听该事件可获取当前选择的分支 -->
  <el-dropdown trigger="click" menu-align="start" class="branch-dropdown">
    <el-button size="small" class="branch-dropdown-button" style="margin-left: 20px;">分支：{{ currentBranch }}
      <icon name="caret-down"></icon>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="branch-dropdown-content" style="background: #eef1f6; border-radius: 8px; width: 200px;">
      <span style="line-height: 25px; font-size: 14px; margin-left: 10px;">切换分支
        <el-input style="margin-bottom: 10px;" placeholder="搜索分支" v-model="fliterText" size="small" autofocus></el-input>
      </span>
      <el-table @row-click="changeBranch" :data="filteredBranch" :show-header="false" empty-text="Nothing to show">
        <el-table-column>
          <template scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <span v-if="scope.row.name===currentBranch">
              <icon name="check"></icon>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: [
    'branches'
  ],
  data() {
    return {
      filteredBranch: [],
      fliterText: '',
      currentBranch: 'master'
    }
  },
  watch: {
    fliterText(val) { this.filterBranch(val) }
  },
  created() {
    this.filteredBranch = this.branches
  },
  methods: {
    filterBranch(val) {
      if (!val) {
        this.filteredBranch = this.branches
      } else {
        this.filteredBranch = []
        this.branches.forEach(element => {
          if (element.name.indexOf(val) >= 0) {
            this.filteredBranch.push(element)
          }
        })
      }
    },
    changeBranch(row) {
      this.currentBranch = row.name
      this.$emit('changed', row.name)
      console.log('分支切换成功')
    }
  }
}
</script>
