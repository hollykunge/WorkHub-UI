<template>
  <div class="task-label">
    <div class="task-label-header">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="15">
          <el-button class="new-task-label" @click="handleCreateLabel" type="success" icon="plus" size="small">创建标签</el-button>
        </el-col>
        <el-col :span="8">
          <div class="label-button-group">
            <el-button-group>
              <el-button class="filter-item" @click="handleLable" type="success" icon="lable" size="small" plain>
                <icon name="bookmark"></icon>标签
              </el-button>
              <el-button class="filter-item" @click="handleMilestone" type="success" size="small" plain>
                <icon name="flag"></icon>里程碑
              </el-button>
            </el-button-group>
            <el-input @keyup.enter.native="handleLabelFilter" class="filter-item" style="width: 150px;" placeholder="标签" size="small" v-model="listQuery.name"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleLabelFilter" size="small">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="task-label-new" v-show="showCreateTable">
      <div class="label-container">
        <span v-if="labelForm.name == undefined || labelForm.name.trim().length == 0" :style="{backgroundColor: labelForm.color}">{{labelPreview}}</span>
        <span v-else :style="{backgroundColor: labelForm.color}">{{labelForm.name}}</span>
      </div>
      <el-form :inline="true" :form="labelForm" :rules="rules" ref="form" label-position="right">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="labelForm.name" placeholder="输入标签名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="content">
          <el-input v-model="labelForm.content" placeholder="添加描述信息（可选）" size="small"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-color-picker v-model="labelForm.color"></el-color-picker>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="danger" @click="cancle" size="small" plain>取消</el-button>
          <el-button v-if="labelForm.id" type="danger" @click="modifyLabel" size="small">修改</el-button>
          <el-button v-else type="success" @click="createLabel" size="small">创建</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="task-label-list">
      <el-table :data="labelHeader" v-loading.body="listLoading" :show-header="false" class="file-table-header">
        <el-table-column align="left">
          <template scope="scope">
            <span v-show="scope" style="font-size: 13px;">
              {{total}} 个标签
            </span>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="labelList" v-loading.body="listLoading" :show-header="false">
        <el-table-column align="left">
          <template scope="scope">
            <div class="label-container">
              <router-link to="/">
                <span :style="{backgroundColor: scope.row.color}">{{scope.row.name}}</span>
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <span class="label-description">{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template scope="scope">
            <router-link to="/">
              <span class="label-number">{{scope.row.numIssues}}个问题</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="right" width="150">
          <template scope="scope">
            <!-- 注意这有一个权限的设置 -->
            <div v-if="userId == scope.row.crtUser">
              <el-button type="primary" @click="handleLabelEdit(scope.row)" size="small" plain>修改</el-button>
              <el-button type="danger" @click="handleLabelDelete(scope.row)" size="small" plain>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="task-label-footer">
      <el-row type="flex" justify="center">
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pageLabel, allLabel, getLabel, addLabel, putLabel, delLabel } from 'api/project/label/index'

export default {
  props: ['projectId', 'taskId'],
  data() {
    return {
      listLoading: false,
      labelHeader: [1],
      total: 0,
      listQuery: {
        name: undefined,
        page: 1,
        limit: 10
      },
      labelList: [{ id: 1, taskId: 1, name: '小小猪', content: '我是一只小小猪', color: '#777777', numIssues: 3, numClosedIssues: 2, crtUser: 1 }],
      showCreateTable: false,
      labelPreview: '标签预览',
      labelForm: {
        taskId: undefined,
        name: undefined,
        color: '#7AE13F',
        content: undefined
      },
      rules: {}
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.getLabelList()
  },
  methods: {
    handleCreateLabel() {
      this.showCreateTable = !this.showCreateTable
      this.resetForm()
    },
    handleLable() {
      this.$router.push({ name: '问题标签' })
    },
    handleMilestone() {
      this.$router.push({ name: '里程碑' })
    },
    handleLabelFilter() {
      this.listLoading = true
      this.listQuery.taskId = this.taskId
      pageLabel(this.listQuery).then(res => {
        this.listLoading = false
        this.labelList = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange() {
      this.listQuery.limit = val;
      this.getLabelList();
    },
    handleCurrentChange() {
      this.listQuery.page = val;
      this.getLabelList();
    },
    handleLabelEdit(row) {
      this.labelForm = row
      this.showCreateTable = true
    },
    handleLabelDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLabel(row.id)
          .then(res => {
            if (res.status === 200) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.labelList.indexOf(row)
              this.labelList.splice(index, 1)
            } else {
              this.$notify({
                title: '失败',
                message: '删除失败',
                type: 'error',
                duration: 2000
              })
            }

          })
      })
    },
    cancle() {
      this.showCreateTable = false
    },
    getLabelList() {
      this.listLoading = true
      this.listQuery.taskId = this.taskId
      pageLabel(this.listQuery).then(res => {
        this.listLoading = false
        this.labelList = res.data.rows
        this.total = res.data.total
      })
    },
    modifyLabel() {
      putLabel(this.labelForm).then(res => {
        if (res.status === 200) {
          this.getLabelList()
          this.showCreateTable = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    createLabel() {
      this.labelForm.taskId = this.taskId
      this.labelForm.numIssues = 0
      this.labelForm.numClosedIssues = 0
      addLabel(this.labelForm).then(res => {
        if (res.status === 200) {
          this.getLabelList()
          this.showCreateTable = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '创建失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    resetForm() {
      this.labelForm = {
        taskId: this.taskId,
        name: undefined,
        color: '#7AE13F',
        content: undefined
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.task-label {
  &-new {
    padding: 16px;
    background-color: #ffffff;
    border-radius: 3px;
    margin: 0 30px 10px 20px;
    height: 168px;
    .el-form {
      margin-top: 20px;
    }
    .el-form-item {
      vertical-align: bottom;
    }
    .el-color-picker {
      display: table;
    }
  }
  &-header {
    margin-bottom: 16px;
    .new-task-label {
      margin-left: 20px;
    }

    .label-button-group {
      position: absolute;
      right: 18px;
      padding-right: 12px;
      .el-input {
        width: 150px;
      }
      .el-button {
        .fa-icon {
          margin: -3px 3px -2px -5px;
        }
        &:not(:last-child) {
          margin-right: 0px;
          border-right-color: #acb1b7;
        }
      }
    }
  }
  &-list {
    margin: 0 30px 10px 20px;
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
.label-container {
  span {
    padding: 5px 3px;
    font-size: 16px;
    font-weight: 600;
    line-height: 2;
    border-radius: 3px;
    transition: opacity 0.2s linear;
  }
}
.label-description {
  color: #586069;
  font-size: 12px;
}
.label-number {
  font-size: 12px;
  color: #586069;
}
</style>
