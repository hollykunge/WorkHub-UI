<template>

</template>

<script>
export default {
  methods: {
    handleTabClick() {
      console.log('任务设置')
      this.$emit('toggleStatus')
    }
  }
}
</script>

<style>

</style>
