<template>
  <div class="task-data">
    <div class="task-data-header">
      <el-row type="flex" justify="start">
        <el-col :span="10">
          <property-select title="分支" :properties="branches" @changed="handleBranchChanged"></property-select>
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
import propertySelect from 'src/views/components/propertySelect'
import { getTaskData } from 'api/project/task/index'
import { mapGetters } from 'vuex'
export default {
  props: ['projectId', 'taskId'],
  components: { propertySelect },
  data () {
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
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  created () {
    // 进入到详情页自动获取后台数据
    // this.getTaskData()
  },
  methods: {
    getTaskData () {
      getTaskData(this.taskId).then(res => {
        this.branches = res.data.branches
      })
    },
    handleBranchChanged (newBranch) {
      console.log(newBranch)
    },
    handleCreate () {
      // this.$router.push()
      // console.log(this.$router.props)
      this.$router.push('/projectSys/allProjects/' + this.projectId + '/' + this.taskId + '/' + 'new')
    },
    handleUpload () {
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
        background-color: #ffffff;
      }
    }
  }
}
</style>
