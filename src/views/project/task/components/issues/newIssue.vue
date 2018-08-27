<template>
  <div class="discussion-box">
    <el-input v-model="issue.name" placeholder="标题"></el-input>
    <comment-dialog title="" @onConfirm="hangdleCommentChange" confirmText="提交"></comment-dialog>
  </div>
</template>

<script>
import commentDialog from 'views/components/commentDialog'
import markDown from 'views/components/markdown'
import { addIssue } from 'api/project/issue/index'
import { mapGetters } from 'vuex'

export default {
  components: { markDown, commentDialog },
  data() {
    return {
      issue: {
        name: '',
        content: '',
        posterId: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.issue.posterId = this.userId
  },
  methods: {
    hangdleCommentChange(val) {
      // console.log(val)
      this.issue.content = val
      addIssue(this.issue).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
</style>
