<template>
  <div class="user-helper">
    <div class="show-markdown" v-html="html"></div>
  </div>
</template>

<script>
import ReadMe from '../../../README.md'

export default {
  data() {
    return {
      markdownText: '',
      html: ReadMe
    }
  },
  created() {
    // this.renderMD()
  },
  methods: {
    getMarkdownText() {
      this.markdownText = ''
    },
    renderMD() {
      this.getMarkdownText()
      if (this.markdownText === '') {
        this.html = '<span class="error-text">文档获取失败，刷新重试！</span>'
        return
      }

      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.markdownText)
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.user-helper {
  margin: 0 200px;
  background-color: white;
  .show-markdown {
    -webkit-box-shadow: 0px 0px 10px 1px #00152959;
    box-shadow: 0px 0px 10px 1px #00152959;
    padding: 0 20px;
    code {
      background-color: #f6f8fa;
    }
  }
}
</style>
