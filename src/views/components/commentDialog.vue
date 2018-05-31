<template>
  <div class="comment-dialog">
    <img class="comment-avatar" :src="'../'+avatar">
    <div class="comment-bubble">
      <div class="arrow">
        <em></em>
        <span></span>
      </div>
      <div class="content">
        <span class="content-header" style="line-height: 40px;">
          <strong>提交变更</strong>
        </span>
        <div class="content-editor">
          <md-editor id='contentEditor' ref="contentEditor" v-model='content' :height="200" :zIndex='20'></md-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MdEditor from 'components/MdEditor'

export default {
  name: 'commentDialog',
  components: { MdEditor },
  data() {
    return {
      content: '## Simplemde'
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
.comment-dialog {
  margin-top: 20px;
  display: inline-flex;
  width: 100%;
  // .commit-form-wrapper {
  //   display: inline-flex;
  //   width: 100%;
  .comment-avatar {
    height: 48px;
  }
  .comment-bubble {
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
  // }
}
</style>
