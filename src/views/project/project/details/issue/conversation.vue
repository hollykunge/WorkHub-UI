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
          <!-- <mark-down></mark-down> -->
          <div class="discussion-box">
            <div class="upload-file-footer">
              <div class="commit-form-wrapper">
                <img class="commit-avatar" :src="'../'+avatar">
                <div class="commit-bubble">
                  <div class="arrow">
                    <em></em>
                    <span></span>
                  </div>
                  <div class="content">
                    <span class="content-header" style="line-height: 40px;">
                      <strong>提交变更</strong>
                    </span>
                    <!-- <el-form>
                      <el-form-item>
                        <el-input placeholder="上传文件至 ''"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-input type="textarea" :rows="6" placeholder="为文件添加描述信息（可选）"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="success" size="small" :disabled="fileList.length==0" @click="handleCreate">立即创建</el-button>
                        <el-button size="small" type="danger" @click="cancle" plain>取消</el-button>
                      </el-form-item>
                    </el-form> -->
                    <!-- <mark-down></mark-down> -->
                    <p>111111111111111111111111</p>
                    <!-- <div> -->
                    <comment-dialog></comment-dialog>
                    <!-- </div> -->

                  </div>
                </div>
              </div>
            </div>
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
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['avatar'])
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
      // width: 100%;
      // background: red;
      // ----------------------------------------------------------------------------------------------
      .upload-file-footer {
        margin-top: 20px;
        .commit-form-wrapper {
          display: inline-flex;
          width: 100%;
          .commit-avatar {
            height: 48px;
          }
          .commit-bubble {
            width: 88%;
            position: relative;
            border: 1px solid #d6d2d2;
            border-radius: 6px;
            background-color: #f0f8ff;
            margin: 0 0 20px 20px;
            .arrow {
              position: absolute;
              width: 40px;
              height: 40px;
              top: 15px;
              left: -20px;
              * {
                display: block;
                border-width: 10px;
                position: absolute;
                border-style: solid dashed dashed dashed;
                font-size: 0;
                line-height: 0;
              }
              em {
                border-color: transparent #d6d2d2 transparent transparent;
              }
              span {
                border-color: transparent #f0f8ff transparent transparent;
                left: 2px;
              }
            }
            .content {
              &-header {
                margin: 0 15px;
              }
            }
          }
        }
      }

      // ----------------------------------------------------------------------------------------------
    }
    .discussion-sidebar {
      width: 100%;
      background: green;
    }
  }
}
</style>
