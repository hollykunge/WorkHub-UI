<template>
  <div>
    <div class="logo-con">
      <img v-show="!isCollapse" src="../../../static/images/logo.jpg" key="max-logo" />
      <img v-show="isCollapse" src="../../../static/images/logo-min.jpg" key="min-logo" />
    </div>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes='permissionMenus'></sidebar-item>
    </el-menu>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'permissionMenus'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.logo-con {
  height: 50px;
  background-color: #eef1f6;
  text-align: center;
  .img {
    height: 50px;
    width: auto;
  }
}
</style>

