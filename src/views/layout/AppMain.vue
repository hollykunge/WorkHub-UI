<template>

  <section class="app-main">
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view :key="key"></router-view>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-main {
  min-height: -webkit-fill-available;
  min-height: fill-available;
}
</style>

