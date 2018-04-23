<template>
	<div class='menu-wrapper'>

		<template v-for="item in routes">
			<!-- <router-link v-if="item.children.length>0" :to="item.code+'/'+item.children[0].code">
			<el-menu-item :index="item.code+'/'+item.children[0].code" class='submenu-title-noDropdown'>
				<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
				<span slot="title">{{item.children[0].title}}</span>
			</el-menu-item>
		</router-link> -->
			<el-submenu :index="item.title" :key="item.title">
				<template slot="title">
					<!-- <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg> -->
					<icon v-if='item.icon' :name="item.icon"></icon>
					<span>{{item.title}}</span>
				</template>
				<template v-for="child in item.children">
					<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.title"> </sidebar-item>
					<router-link v-else :to="'/'+item.code+'/'+child.code" :key="child.code">
						<el-menu-item :index="item.code+'/'+child.code">
							<!-- <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg> -->
							<icon v-if='child.icon' :name="child.icon"></icon>
							<span>{{child.title}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>

		</template>

	</div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: { routes: { type: Array }}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

