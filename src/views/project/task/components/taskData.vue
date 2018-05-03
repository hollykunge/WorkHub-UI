<template>
  <div class="task-data">
    <div class="task-data-header">
      <el-row type="flex" justify="start">
        <el-col :span="10">
          <el-dropdown trigger="click" menu-align="start" class="branch-dropdown">
            <el-button size="small" class="branch-dropdown-button">分支：{{ currentBranch }}
              <icon name="caret-down"></icon>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="branch-dropdown-content">
              <el-card>
                <span slot="header">切换分支</span>
                <el-input placeholder="搜索分支" v-model="fliterText" size="small"></el-input>
                <el-table @row-click="filteredBranch" :data="branches" :show-header="false" empty-text="Nothing to show">
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
import { getTaskData } from 'api/project/task/index'
export default {
  props: ['taskId'],
  data() {
    return {
      currentBranch: 'master',
      fliterText: '',
      filteredBranch: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      branches: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }]
    }
  },
  watch: {
    fliterText(val) { this.filterBranch(val) }
  },
  computed: {
  },
  created() {
    // 进入到详情页自动获取后台数据
    // this.getTaskData()
  },
  methods: {
    handleTabClick() {
      console.log('任务数据')
      // this.getTaskData()
    },
    getTaskData() {
      getTaskData(this.taskId).then(res => {
        this.branches = res.data.branches
      })
    },
    filterBranch(val) {

    },
    changeBranch(row) {
      this.currentBranch = row.name
      console.log('分支切换成功')
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
      &__body {
        padding: 4px 0px;
      }
    }
    padding: 0;
    border-radius: 5px;
  }
}
</style>
