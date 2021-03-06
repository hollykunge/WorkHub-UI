// 新建项目页面
<template>
  <div class="page-new-project">
    <div class="page-new-project-header">
      <h2>创建一个新的项目</h2>
    </div>
    <div class="page-new-project-main">
      <el-form :model="form" :rules="rules" ref="form" :show-message="false">

        <div class="subheader">
          <el-form-item prop="projectUserId">
            <p class="subheader-label">负责人</p>
            <el-select v-model="form.projectUserId" filterable remote placeholder="搜索用户" :remote-method="remoteProUserMethod" :loading="loading" loading-text="正在搜索···">
              <el-option v-for="item in userItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
            <span class="subheader-slash">/</span>
          </el-form-item>
          <el-form-item prop="projectName">
            <p class="subheader-label">项目名称</p>
            <el-input v-model="form.projectName" style="width: 400px"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="计划开始时间" prop="projectTimeStart">
          <el-date-picker editable v-model="form.projectTimeStart" type="datetime" placeholder="选择开始时间" align="center" format="yyyy年MM月dd日HH:MM" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计完成时间" prop="projectPlanEnd">
          <el-date-picker editable v-model="form.projectPlanEnd" type="datetime" placeholder="选择完成时间" align="center" :picker-options="pickerOptions" format="yyyy年MM月dd日HH:MM" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="当前所处阶段" prop="projectPhase">
          <el-select v-model="form.projectPhase" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in projectPhaseOptions" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="projectDes">
          <el-input type="textarea" :autosize="{minRows: 3,maxRows:5}" placeholder="为项目添加描述信息" v-model="form.projectDes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="create('form')" :disabled="createdEnabled">创建项目</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { page as searchProject, addObj as createProject} from 'api/project/index'
import { page as userPage } from 'api/admin/user/index'

export default {
  name: 'newProject',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '明天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }, {
          text: '一个月后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', date)
          }
        }]
      },
      form: {
        projectName: undefined,
        projectUserId: '', // 执行者id
        projectPhase: { key: '需求调研阶段', value: 1 },
        projectPlanEnd: undefined,
        projectTimeStart: undefined,
        projectDes: undefined
      },
      rules: {
        projectName: [
          {
            required: true,
            message: '项目名称不能为空'
          }
        ],
        projectUserId: {
          required: true,
          message: '请选择'
        },
        projectPhase: [
          {
            required: true,
            message: '请选择'
          }
        ],
        projectPlanEnd: [
          {
            required: true,
            message: '计划完成时间不能为空'
          }
        ],
        projectDes: [
          {
            required: true,
            message: '项目描述不能为空'
          }
        ],
        projectTimeStart: [
          {
            required: true,
            message: '项目完成时间不能为空'
          }
        ]
      },
      userItems: [],
      loading: false,
      listQuery: {
        page: 1,
        limit: 10,
        projectName: undefined,
        projectUserId: ''
      },
      projectPhaseOptions: [{ key: '需求调研阶段', value: 1 }, { key: '技术论证阶段', value: 2 }, { key: '设计阶段', value: 3 }, { key: '开发阶段', value: 4 }],
      createdEnabled: true
    }
  },
  computed: {
    ...mapGetters([
      'elements',  //后期添加权限需要，暂时没用到
      'userId', // 当前登陆用户的ID
      'name' // 当前登陆用户的用户名
    ])
  },
  created() {},
  mounted() {},
  watch: {
    form: {
      handler() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.createdEnabled = false
          } else {
            this.createdEnabled = true
          }
        })
      },
      deep: true
    }
  },
  methods: {
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          createProject(this.form).then(res => {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({name: '全部项目'})
          })
        } else {
          return false
        }
      })
    },
    remoteProUserMethod(query) {
      if (query !== '') {
        this.loading = true
        this.loading = false
        userPage({
          name: query
        }).then(response => {
          this.userItems = response.data.rows
          this.loading = false
        })
      } else {
        this.userItems = []
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.page-new-project {
  width: 700px;
  margin: 24px auto 0;
  &-header {
    margin-bottom: 24px;
    display: flex;
    border-bottom: 1px #e1e4e8 solid;
    flex-flow: row wrap;
  }
  &-main {
    .subheader {
      display: inline-flex;
      padding-right: 174px;
      margin-bottom: 16px;
      border-bottom: 1px #e1e4e8 solid;
      .el-form-item__content {
        line-height: 24px;
        font-size: 14px;
      }
      &-label {
        font-weight: 600;
        margin-bottom: 0px;
        margin-top: 0px;
      }
      &-slash {
        margin: 0 8px;
        font-size: 21px;
      }
      .el-select .el-input__inner {
        cursor: pointer;
        padding-right: 0px;
        width: 100px;
      }
    }

  }
}
</style>
