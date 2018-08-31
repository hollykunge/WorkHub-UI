<template>
  <!-- 用于提交的对话框 -->
  <!-- title：对话框的标题，默认为“对话框” -->
  <!-- avatar：用户头像，接收用户头像的地址 -->
  <!-- cancleText：取消按钮显示的文字，默认为“”，只有当其值不为空时才会显示-->
  <!-- confirmText：确认按钮显示的文字，默认为“确认”-->
  <!-- 事件：contentChange 当输入的文字变化时，触发的事件，参数值为当前的内容 -->
  <!-- 事件：onCancle 点击取消按钮触发的事件 -->
  <!-- 事件：onConfirm 点击确认按钮触发的事件，事件的参数值为当前的内容 -->
  <div class="comment-dialog">
    <!-- <img class="comment-avatar" :src="'../'+avatar"> -->
    <Avatar :username="name" :size="45" :lighten="200" style=""></Avatar>
    <div class="comment-bubble">
      <div class="arrow">
        <em></em>
        <span></span>
      </div>
      <div class="content">
        <span v-if="title!=''" class="content-header" style="line-height: 40px;">
          <strong>{{title}}</strong>
        </span>
        <div class="content-editor">
          <md-editor id='contentEditor' ref="contentEditor" v-model='content' height="150px " :zIndex='20'></md-editor>
        </div>
      </div>
      <div class="footer">
        <el-button v-if="cancleText!=''" type="danger" size="small" @click="handleCancle" plain>{{cancleText}}</el-button>
        <el-button type="success" size="small" @click="handleConfirm">{{confirmText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MdEditor from 'components/MdEditor'
import { mapGetters } from 'vuex'

export default {
  name: 'commentDialog',
  components: { MdEditor },
  props: {
    title: {
      type: String,
      default: '对话框'
    },
    avatar: {
      type: String,
      default: '../../../../static/images/logo-min.png'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancleText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: '# '
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  watch: {
    content(val) { this.$emit('contentChange', val) }
  },
  methods: {
    handleCancle() {
      this.$emit('onCancel')
    },
    handleConfirm() {
      console.log('点击了确认')
      this.$emit('onConfirm', this.content)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.comment-dialog {
  margin: 20px 0 0 20px;
  display: inline-flex;
  width: 100%;
  .comment-avatar {
    height: 48px;
    margin-right: -10px;
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
      &-editor {
        .CodeMirror {
          height: 100% !important;
        }
        height: 200px;
      }
    }
    .footer {
      display: flex;
      margin-left: 85%;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
