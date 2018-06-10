<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar class="navbar-content"></navbar>
      <app-main class="main-content"></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from 'views/layout'

export default {
  name: 'layout',
  components: { Navbar, Sidebar, AppMain },
  computed: { sidebar () { return this.$store.state.app.sidebar } }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-container {
      width: 64px;
      overflow: inherit;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    }
    .main-container {
      margin-left: 64px;
      .navbar-content {
        padding-right: 64px;
      }
    }
  }
  .sidebar-container {
    transition: width 0.28s ease-out;
    width: 256px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    z-index: 1001;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 256px;
    .navbar-content {
      width: 100%;
      padding-right: 256px;
      position: fixed;
      top: 0;
      z-index: 1000;
    }
    .main-content {
      margin-top: 64px;
    }
  }
}
</style>
