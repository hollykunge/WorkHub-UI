<template>
  <div class="issue-conversion">
    <div class="issue-conversion-header">
      <span class="issue-conversion-header-title">
        {{issueContent.title}}
      </span>
      <div class="issue-conversion-header-tips">
        <el-button size="small" type="success">
          <icon name="question-circle-o" font-size="16px"></icon>未解决
        </el-button>
        <span>
          <a>
            {{issueContent.user}}
          </a> 在{{issueContent.time}}提出这个问题</span>
      </div>
    </div>
    <div class="issue-conversion-body">
      <el-row>
        <el-col :span="20">
          <div class="discussion-box">
            <comment-dialog title="发表评论" @contentChange="hangdleCommentChange" confirmText="提交评论"></comment-dialog>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="discussion-sidebar">
            <p>1</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import commentDialog from 'views/components/commentDialog'
import markDown from 'views/components/markdown'
import { mapGetters } from 'vuex'

export default {
  components: { markDown, commentDialog },
  data() {
    return {
      issueContent: { title: '下载后不能运行', user: '测试用户', time: 'Thu May 31 2018 15:23:06' },
      fileList: [],
      commentContent: '## 说点什么吧！'
    }
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  watch: {
    // commentContent(val) {
    //   console.log(val)
    // }
  },
  methods: {
    handleCreate() {
      // this.$emit('toggleStatus', '')
      alert('文件上传成功')
      this.fileList = []
      this.$router.push({ name: '数据' })
    },
    cancle() {
      // this.$emit('toggleStatus', '')
      this.$router.go(-1)
    },
    hangdleCommentChange(val) {
      console.log(val)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.issue-conversion {
  &-header {
    margin: 0 20px;
    display: block;
    border-bottom: 1px solid #768d8033;
    padding-bottom: 10px;
    &-title {
      font-size: 30px;
      font-weight: 500;
    }
    &-tips {
      margin-top: 5px;
      button {
        padding: 3px;
      }
      span {
        font-size: 14px;
        a {
          background-color: #a9a9a970;
          border-radius: 4px;
        }
        a:hover {
          background-color: #fff;
          text-decoration: underline;
        }
      }
    }
  }
  &-body {
    .discussion-box {
    }
    .discussion-sidebar {
      width: 100%;
      background: green;
    }
  }
}
</style>
