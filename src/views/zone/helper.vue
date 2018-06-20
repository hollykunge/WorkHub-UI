<template>
  <div class="user-helper">
    <div class="show-markdown" v-html="html"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markdownText: '',
      html: ''
    }
  },
  created() {
    this.renderMD()
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
.show-markdown {
  text-align: center;
  margin-top: 20px;
}
</style>
