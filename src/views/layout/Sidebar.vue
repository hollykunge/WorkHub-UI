<template>
  <div>
    <div class="logo-con">
      <router-link to="/">
        <img v-show="!isCollapse" src="../../../static/images/logo.svg" key="max-logo" />
        <img v-show="isCollapse" src="../../../static/images/logo-min.svg" key="min-logo" />
      </router-link>
    </div>
    <div>
      <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
        <sidebar-item :routes='permissionMenus'></sidebar-item>
      </el-menu>
    </div>
    <div class="copyright-con" :class="{hideSidebar:isCollapse}">
      <address>WorkHub Team</address>
      <span>
        Copyright
        <icon name="copyright"></icon>
        2017~2018
        </span>
    </div>
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
  height: 64px;
  text-align: center;
  transition: all 0.3s;
  background: #002140;
  img {
    padding: 8px;
    height: 64px;
    width: auto;
  }
}
.el-menu {
  border-radius: 0px;
}
.el-menu--dark {
  background-color: #001529 !important;
}
.el-menu--collapse {
  width: 80px;
}
.copyright-con {
  margin-left: 40px;
  text-align: center;
  position: absolute;
  bottom: 20px;
  font-size: 16px;
  color: aliceblue;
  transition: margin-left 0.28s linear;
  &.hideSidebar {
    transition: margin-left 0.28s linear;
    margin-left: 0px;
    font-size: 14px;
    span {
      display: none;
    }
  }
}
</style>

