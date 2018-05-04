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
                <el-input placeholder="搜索分支" v-model="fliterText" size="small" autofocus></el-input>
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
              </el-card>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="4" :offset="10">
          <el-button-group class="task-options-button">
            <el-button size="small" @click="handleCreate" plain>
              <icon name="file-o"></icon>
              新 建</el-button>
            <el-button size="small" @click="handleUpload" plain>
              <icon name="upload"></icon>文件上传</el-button>
            <el-button size="small" plain>
              <icon name="cloud-download"></icon>下 载</el-button>
          </el-button-group>
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
      this.$emit('toggleStatus')
      // this.getTaskData()
    },
    getTaskData() {
      getTaskData(this.taskId).then(res => {
        this.branches = res.data.branches
      })
    },
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
      console.log('分支切换成功')
    },
    handleCreate() {
      this.$emit('toggleStatus', 'create')
    },
    handleUpload() {
      this.$emit('toggleStatus', 'upload')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-data-header {
  margin-bottom: 10px;
}
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
.task-options-button {
  position: absolute;
  right: 18px;
  padding-right: 12px;
  .el-button {
    &:not(:last-child) {
      margin-right: 0px;
    }
    &:not(:first-child):not(:last-child) {
      border-left-color: #acb1b7;
      border-right-color: #acb1b7;
    }
  }
}
</style>
