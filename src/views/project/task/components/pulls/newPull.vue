<template>
  <div class="new-pull">
    <div class="new-pull-header">
      <h3>新建合并请求</h3>
    </div>
    <div class="new-pull-branch">
      <property-select title="基础分支" :properties="baseBranches" @changed="handleBaseBranch"></property-select>
      <icon name="long-arrow-left"></icon>
      <property-select title="待合并分支" :properties="compareBranches" @changed="handleCompareBranch"></property-select>
    </div>
    <div class="new-pull-content">
      <comment-dialog inputPrompt="标题" confirmText="创建合并请求" @onConfirm="handleSubmit"></comment-dialog>
    </div>
    <div class="new-pull-info">
      <!-- <span>显示分支 {{baseBranch}} 和分支 {{compareBranch}} 的比对信息</span> -->
    </div>
  </div>
</template>

<script>
import propertySelect from 'src/views/components/propertySelect'
import commentDialog from 'src/views/components/commentDialog'
import { addPull } from 'api/project/pull/index'
import { getTaskBranch } from 'api/project/task/index'

export default {
  props: ['projectId', 'taskId'],
  components: { propertySelect, commentDialog },
  data() {
    return {
      baseBranches: [{ name: 'master' }],
      compareBranches: [],
      baseBranch: 'master',
      compareBranch: undefined
    }
  },
  created() {
    this.getBranches()
  },
  methods: {
    getBranches() {
      getTaskBranch(this.taskId).then(res => {
        res.forEach(branch => {
          this.compareBranches.push({ 'name': branch })
        });
      })
    },
    handleBaseBranch(val) {
      this.baseBranch = val
      console.log(val)
    },
    handleCompareBranch(val) {
      this.compareBranch = val
      console.log(val)
    },
    handleSubmit(val) {
      if (val.title === '') {
        this.$notify({
          title: '提示',
          message: '标题不能为空',
          type: 'warning',
          duration: 2000
        })
        return
      }
      if (this.compareBranch === undefined) {
        this.$notify({
          title: '提示',
          message: '待合并分支不能为空',
          type: 'warning',
          duration: 2000
        })
        return
      }
      const pullRequest = {
        taskId: this.taskId,
        title: val.title,
        context: val.context,
        baseBranch: this.baseBranch,
        headBranch: this.compareBranch
      }
      addPull(pullRequest).then(res => {
        this.$notify({
          title: '成功',
          message: '合并请求创建成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({ name: '合并请求' })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.new-pull {
  margin: 0 30px 10px 20px;
  &-header {
    margin-bottom: 24px;
    border-bottom: 1px #e1e4e8 solid;
  }
  &-branch {
    margin-bottom: 16px;
    // border-bottom: 1px #e1e4e8 solid;
  }
}
</style>
