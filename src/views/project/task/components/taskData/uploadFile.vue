<template>
  <div class="upload-file">
    <div class="upload-file-header">
      <!-- 新建文件和上传文件这一部分要封装成一个通用组件 -->
      <el-form :inline="true">
        <el-form-item>
          <el-button type="text">当前项目</el-button>
          <icon name="chevron-right"></icon>
          <el-button type="text">当前文件位置</el-button>
          <icon name="chevron-right"></icon>
        </el-form-item>
      </el-form>
    </div>
    <div class="upload-file-content">
      <el-upload class="upload-drag" show-file-list multiple drag action="https://jsonplaceholder.typicode.com/posts/">
        <div class="upload-tips">
          <icon name="cloud-upload"></icon>
          <p>拖拽文件到此处或点击
            <em>选择文件</em>
          </p>
        </div>
      </el-upload>
    </div>
    <div class="upload-file-footer">
      <div class="commit-form-wrapper">
        <img class="commit-avatar" :src="avatar">
        <div class="commit-bubble">
          <div class="arrow">
            <em></em>
            <span></span>
          </div>
          <div class="content">
            <span style="line-height: 40px;">
              <strong>提交变更</strong>
            </span>
            <el-form>
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
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
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
.upload-file {
  margin: 0 20px;
  &-header {
    height: 40px;
    .fa-icon {
      font-size: 12px;
      color: #11181d9a;
    }
    .el-button {
      font-size: 17px;
      line-height: 0;
      color: #20a19b;
      &:hover {
        color: #20a0ff;
      }
    }
  }
  &-content {
    .upload-drag {
      .el-upload {
        width: 100%;
        &-dragger {
          width: 100%;
          background-color: #f7f7f7c2;
          .upload-tips {
            margin-top: 25px;
            .fa-icon {
              font-size: 65px;
              color: #a9a9a9;
            }
            p {
              font-size: 17px;
              color: #a9a9a9;
              em {
                color: #20a0ff;
              }
            }
          }
        }
      }
      .el-upload-list__item {
        border: 1px solid #adb6c2;
      }
    }
  }
  &-footer {
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
          margin: 0 15px;
        }
      }
    }
  }
}
</style>
