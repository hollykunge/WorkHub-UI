<template>
  <el-dialog :visible.sync="showDialog" @close="handleDialogClose">
    <div slot="title" class="link-user-header"></div>

    <div class="link-user-body"></div>

    <div slot="footer" class="link-user-footer"></div>
  </el-dialog>
</template>

<script>
export default {
  name: 'linkUser',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    handleDialogClose() {
      this.props.showDialog = false
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
