<template>
  <!-- 切换属性的公共组件 -->
  <!-- 下拉菜单的标题 title 类型为Sting -->
  <!-- 需要为组件传一个下拉菜单内容数组 properties -->
  <!-- 当选择属性时触发 changed 事件，通过监听该事件可获取当前选择的属性 -->
  <el-dropdown trigger="click" menu-align="start" class="property-dropdown">
    <el-button size="small" class="property-dropdown-button">{{title}}：{{ currentProperty }}
      <icon name="caret-down"></icon>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="property-dropdown-content" style="background: #ffffff; border-radius: 8px; width: 200px;">
      <span style="line-height: 25px; font-size: 14px; margin-left: 10px;">切换{{title}}
        <el-input style="margin-bottom: 10px;" placeholder="搜索···" v-model="fliterText" size="small" autofocus></el-input>
      </span>
      <el-table @row-click="changeProperty" :data="filteredProperty" :show-header="false" empty-text="Nothing to show">
        <el-table-column>
          <template scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <span v-if="scope.row.name===currentProperty">
              <icon name="check"></icon>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: [
    'properties',
    'title'
  ],
  data () {
    return {
      filteredProperty: [],
      fliterText: '',
      currentProperty: undefined
    }
  },
  watch: {
    fliterText (val) { this.filterProperty(val) }
  },
  created () {
    this.filteredProperty = this.properties
    if (this.currentProperty === undefined && this.properties[0] !== undefined) {
      this.currentProperty = this.properties[0].name
      // console.log(this.properties[0].name)
    } 
  },
  methods: {
    filterProperty (val) {
      if (!val) {
        this.filteredProperty = this.properties
      } else if (this.properties === undefined || this.properties.lengrh === 0) {
        this.filteredProperty = []
      } else {
        this.filteredProperty = []
        this.properties.forEach(element => {
          if (element.name.indexOf(val) >= 0) {
            this.filteredProperty.push(element)
          }
        })
      }
    },
    changeProperty (row) {
      this.currentProperty = row.name
      this.$emit('changed', row.name)
    }
  }
}
</script>
