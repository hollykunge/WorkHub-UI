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
      <address>
        <span>WorkHub</span>
        <span>Team</span>
      </address>
      <a>
        Copyright
        <icon name="copyright"></icon>
        2017~2018
        </a>
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
  position: fixed;
  bottom: 20px;
  font-size: 16px;
  color: aliceblue;
  transition: margin-left 0.28s linear;
  &.hideSidebar {
    margin-left: 10px;
    font-size: 14px;
    a {
      display: none;
    }
    span {
      display: block;
    }
  }
}
</style>

