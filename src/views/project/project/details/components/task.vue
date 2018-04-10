<template>
  <div class="task-list">
    <div class="filter-container">
      <el-row type="flex" justify="space-between" :gutter="5">
        <el-col :span="15" :offset="1">
          <!-- <el-button class="filter-item" v-if="allProjects_btn_add" @click="handleCreate" type="primary" icon="edit">新建项目</el-button> -->
          <el-button class="filter-item" @click="handleCreateTask" type="success" icon="plus" size="small">创建任务</el-button>
        </el-col>
        <el-col :span="6">
          <!-- <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="项目名称" v-model="listQuery.projectName"> </el-input> -->
          <el-input @keyup.enter.native="handleTaskFilter" class="filter-item" placeholder="任务名称" size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleTaskFilter" size="small">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="task-list-content">
      <el-row type="flex" justify="center">
        <el-col>
          <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row empty-text="暂无任务数据" style="width: 100%">
            <!-- <el-table-column label="任务列表"> -->
            <el-table-column label="序号" prop="taskId"></el-table-column>
            <el-table-column label="任务名称" prop="taskName"></el-table-column>
            <el-table-column label="负责人" prop="taskReser"></el-table-column>
            <el-table-column label="创建时间" prop="taskCrtTime"></el-table-column>
            <el-table-column label="计划完成时间" prop="taskPlanEndTime"></el-table-column>
            <!-- </el-table-column> -->
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 创建任务对话框 -->

    <el-dialog title="创建新的任务" :visible.sync="dialogFormVisible">
      <!-- <el-form :model="form" :rules="rules" ref="form" label-width="100px"> -->
      <el-form :model="form" ref="form" label-width="100px">
        <!-- <el-form-item label="项目id" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目id"></el-input>
        </el-form-item>
        <el-form-item label="项目size" prop="size">
          <el-input v-model="form.size" placeholder="请输入项目id"></el-input>
        </el-form-item> -->
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="当前所处阶段" prop="taskProcess">
          <el-select class="filter-item" v-model="form.taskProcess" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in  taskProcessOptions" :key="item.value" :label="item.key" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划完成时间" prop="taskPlanEnd">
          <el-date-picker editable v-model="form.taskPlanEnd" type="datetime" placeholder="选择完成时间" align="center" format="yyyy年MM月dd日HH:MM" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="开始时间" prop="projectTimeStart">
          <el-date-picker editable v-model="form.projectTimeStart" type="datetime" placeholder="选择开始时间" align="center" format="yyyy年MM月dd日HH:MM" style="width: 100%">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="描述" prop="taskDes">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.taskDes"> </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="create('form')">创 建</el-button>
        <!-- <el-button v-else-if="dialogStatus=='update'" type="primary" @click="update('form')">确 定</el-button> -->
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addObj } from 'api/project/task/index'
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        projectName: undefined
      },
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {
        taskName: undefined,
        // taskIsLeaf: undefined,
        // task_parent_id
        taskPlanEnd: undefined,
        taskProcess: undefined,
        // task_project_id task_resource_id
        taskState: undefined,
        taskDes: undefined
      },
      taskProcessOptions: [{ key: '第一阶段', value: 1 }, { key: '第二阶段', value: 2 }, { key: '第三阶段', value: 3 }, { key: '第四阶段', value: 4 }]
    }
  },
  methods: {
    handleCreateTask() {
      console.log('新建任务')
      // this.resetTemp()
      // this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleTaskFilter() {
      console.log('筛选任务')
    },
    create(formName) {
      // const set = this.$refs
      // set[formName].validate(valid => {
      //   if (valid) {
      addObj(this.form).then(() => {
        this.dialogFormVisible = false
        this.getList()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
      //   } else {
      //     return false
      //   }
      // })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

</style>
