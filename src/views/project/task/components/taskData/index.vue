<template>
  <div class="task-data">
    <div class="task-data-header">
      <el-row type="flex" justify="start">
        <el-col :span="10">
          <property-select title="分支" :properties="branches" @changed="handleBranchChanged"></property-select>
        </el-col>
        <el-col :span="10">
          <!-- <el-button-group class="task-view-switch-button">
            <el-button size="small" @click="switchView(1)" plain>
              <icon name="table"></icon>
              数据</el-button>
            <el-button size="small" @click="switchView(2)" plain>
              <icon name="folder-open-o"></icon>文件列表</el-button>
          </el-button-group> -->
        </el-col>
        <el-col :span="4">
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
      <div class="task-data-body-empty" v-if="fileList.length == 0">
        <h4>暂无数据文件</h4>
      </div>
      <div class="task-data-body-list" v-else>
        <el-table :data="fileHeader" v-loading.body="listLoading" :show-header="false" class="file-table-header" empty-text="无更新记录">
          <el-table-column align="left">
            <template scope="scope">
              <a><img :src="'../../../../' + avatar" height="20px" style="vertical-align: middle;"></a>
              <a style="font-size: 13px; color: #586069;">{{scope.row.name}}</a>
              <a style="font-size: 13px; color: #586069;">{{scope.row.comment}}</a>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template scope="scope">
              <span style="color: #586069; font-size: 13px;">最新提交
                <a style="background-color: #dadde2;border-radius: 5px;font-size: 12px;padding: 6px 10px 4px 10px;">{{scope.row.hashCode}}</a>{{scope.row.time}}
              </span>
            </template>
          </el-table-column>
        </el-table>

        <el-table :data="fileList" v-loading.body="listLoading" :show-header="false">
          <el-table-column align="left">
            <template scope="scope">
              <span>
                <a>
                  <icon v-if="scope.row.isFolder" name="folder-open-o"></icon>
                  <icon v-if="!scope.row.isFolder" name="file-text-o"></icon>
                  {{scope.row.name}}
                </a>
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template scope="scope">
              <span style="color: #7b7373; font-size: 13px;">
                <a>
                  {{scope.row.path}}
                </a>
              </span>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template scope="scope">
              <span style="color: #7b7373; font-size: 13px;">
                <a>
                  {{scope.row.size}}kb
                </a>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="task-data-footer">
        <el-row type="flex" justify="center">
          <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
          </div>
        </el-row>
      </div>
    </div>
    <!-- <div class="temp-area">
      <data-table></data-table>
    </div> -->
  </div>
</template>

<script>
import propertySelect from 'src/views/components/propertySelect'
import dataTable from './dataTable'
import { mapGetters } from 'vuex'
import { getFileList, getObj } from 'api/project/task/index'
export default {
  props: ['projectId', 'taskId'],
  components: { propertySelect, dataTable },
  data() {
    return {
      // ***************************分支数据***************************************
      currentBranch: 'master',
      fliterText: '',
      filteredBranch: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      branches: [{ name: 'master' }, { name: 'jihainan' }, { name: '测试' }],
      // ***************************文件列表数据************************************
      fileHeader: [{ name: 'jihainan', hashCode: 'b2a5e260d4', comment: '修改表头样式', time: '一个小时之前' }],
      // test: [{ name: '文件', path: '文件路径', size: 12, filestoreItem: '', mode: 1, objectId: '342', commitId: '567', isParentPath: true }],
      fileList: [],
      listLoading: false,
      listQuery: {
        limit: 10,
        page: 1,
      },
      total: 0
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters(['avatar', 'userId'])
  },
  created() {
    this.listQuery.taskId = this.taskId
    this.listQuery.crtUser = this.userId
    getObj(this.taskId).then(taskInfo => {
      this.listQuery.taskName = taskInfo.data.taskName
      this.getTaskData()
    })
  },
  methods: {
    getTaskData() {
      this.listLoading = true
      getFileList(this.listQuery).then(res => {
        console.log(res)
        this.fileList = res.data.rows
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleBranchChanged(newBranch) {
      console.log(newBranch)
    },
    handleCreate() {
      this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + this.taskId + '/' + 'new')
    },
    handleUpload() {
      this.$router.push({ name: '文件上传' })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getTaskData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getTaskData()
    },
    switchView(val) {
      console.log(val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-data {
  &-header {
    margin-bottom: 16px;
    .branch-dropdown {
      &-button {
        margin-left: 20px;
      }
    }
    .task-view-switch-button {
      position: absolute;
      right: 243px;
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
    &-empty {
      text-align: center;
      background-color: #ffff;
      h4 {
        padding: 20px;
      }
    }
    &-list {
      .file-table-header {
        border-radius: 3px 3px 0 0;

        &.el-table--enable-row-hover .el-table__body tr:hover > td {
          background-color: #f1f8ff;
        }
        .el-table__row {
          background-color: #f1f8ff;
        }
      }
    }
  }
}
</style>
