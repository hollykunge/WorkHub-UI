<template>

</template>

<script>
export default {
  methods: {
    handleTabClick() {
      console.log('任务介绍')
      this.$emit('toggleStatus')
    }
  }
}
</script>

<style>

</style>
