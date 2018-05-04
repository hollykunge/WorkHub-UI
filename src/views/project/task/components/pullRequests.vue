<template>

</template>

<script>
export default {
  methods: {
    handleTabClick() {
      console.log('合并请求')
      this.$emit('toggleStatus')
    }
  }
}
</script>

<style>

</style>
