<template>
  <div class="request-content">
    <div class="request-content-header">
      <span class="request-content-header-title">
        {{requestTitle}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestTitle: '下载后不能运行'
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.request-content {
  background-color: #bec7c9;
  margin: 0 20px;
  &-header {
    &-title {
      font-size: 26px;
      font-weight: 500;
    }
  }
}
</style>
