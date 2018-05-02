<template>
  <div class="task-data">
    <div class="task-data-header">
      <el-row type="flex" justify="start">
        <el-col :span="10">
          <el-dropdown trigger="click" class="branch-dropdown">
            <el-button size="small" class="branch-dropdown-button">分支：{{ currentBranch }}
              <icon name="caret-down"></icon>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="branch-dropdown-content">
              <el-card>
                <span slot="header">切换分支</span>
              </el-card>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>
    </div>
    <div class="task-data-body">
      <el-table>
        <el-table-column label="llllllll" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentBranch: 'master'
    }
  },
  created() {
    // 进入到详情页自动获取后台数据
  },
  methods: {
    handleTabClick() {
      console.log('任务数据')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.branch-dropdown {
  &-button {
    margin-left: 20px;
  }
  &-content {
    .el-card {
      &__header {
        font-size: 12px;
        padding: 5px 10px;
      }
    }
    padding: 0;
    border-radius: 5px;
  }
}
</style>
