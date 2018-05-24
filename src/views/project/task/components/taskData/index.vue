<template>
  <div class="task-data">
    <div class="task-data-header">
      <el-row type="flex" justify="start">
        <el-col :span="10">
          <el-dropdown trigger="click" menu-align="start" class="branch-dropdown">
            <el-button size="small" class="branch-dropdown-button">分支：{{ currentBranch }}
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
      <el-table :data="fileHeader" :show-header="false" class="file-table-header" empty-text="无更新记录">
        <el-table-column align="left">
          <template scope="scope">
            <a><img :src="'../../' + avatar" height="20px" style="vertical-align: middle;"></a>
            <a style="font-size: 13px; color: #0e6bf7;">{{scope.row.name}}</a>
            <a style="font-size: 13px; color: #7b7373;">{{scope.row.comment}}</a>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template scope="scope">
            <span style="color: #7b7373; font-size: 13px;">最新提交
              <a style="background-color: #dadde2;border-radius: 5px;font-size: 12px;padding: 6px 10px 4px 10px;">{{scope.row.hashCode}}</a>{{scope.row.time}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="fileList" :show-header="false">
        <el-table-column align="left">
          <template scope="scope">
            <span>
              <a>
                <icon v-if="scope.row.isFolder" name="folder-open-o"></icon>
                <icon v-if="!scope.row.isFolder" name="file-text-o"></icon>
                {{scope.row.fileName}}
              </a>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <span style="color: #7b7373; font-size: 13px;">
              <a>
                {{scope.row.comment}}
              </a>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template scope="scope">
            <span style="color: #7b7373; font-size: 13px;">
              <a>
                {{scope.row.time}}
              </a>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTaskData } from 'api/project/task/index'
import { mapGetters } from 'vuex'
export default {
  props: ['projectId', 'taskId'],
  data() {
    return {
      // ***************************分支数据***************************************
      currentBranch: 'master',
      fliterText: '',
      filteredBranch: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      branches: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      // ***************************文件列表数据************************************
      fileHeader: [{ name: 'jihainan', hashCode: 'b2a5e260d4', comment: '修改表头样式', time: '一个小时之前' }],
      fileList: [{ fileName: '文件夹1', comment: '提交测试', time: '一分钟前', isFolder: true }, { fileName: '文件1.doc', comment: '文件测试', time: '刚刚', isFolder: false }]
    }
  },
  watch: {
    fliterText(val) { this.filterBranch(val) }
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  created() {
    // 进入到详情页自动获取后台数据
    // this.getTaskData()
  },
  methods: {
    // handleTabClick() {
    //   console.log('任务数据')
    //   this.$emit('toggleStatus')
    // },
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
      // this.$router.push()
      // console.log(this.$router.props)
      this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + this.taskId + '/' + 'new')
    },
    handleUpload() {
      // this.$emit('toggleStatus', 'upload')
      this.$router.push({ name: '文件上传' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-data {
  &-header {
    margin-bottom: 10px;
    .branch-dropdown {
      &-button {
        margin-left: 20px;
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
  }
  &-body {
    margin: 0 30px 0 20px;
    .file-table-header {
      border-radius: 3px 3px 0 0;
      .el-table__row {
        background-color: #eef1f6;
      }
    }
  }
}
</style>
