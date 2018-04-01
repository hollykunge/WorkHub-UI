<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container">
			<div slot="top" class="logo-con">
				<img v-show="sidebar.opened"  src="../../../static/images/logo.jpg" key="max-logo" />
				<img v-show="!sidebar.opened" src="../../../static/images/logo-min.jpg" key="min-logo" />
			</div>
		</sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from 'views/layout';

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    }
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
			.sidebar-container{
				width:58px;
				overflow: inherit;
			}
			.main-container {
				margin-left: 58px;
			}
		}
		.sidebar-container {
			transition: width 0.28s ease-out;
			width: 210px;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
		}
		.main-container {
			min-height: 100%;
			transition: margin-left 0.28s ease-out;
			margin-left: 210px;
		}
	}
</style>
