<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <div>
          <p style="background-color: red">1111111111111111111111111111111111111111111111111111111111111111111111</p>
          <sticky></sticky>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <p style="background-color: green">1111111111111111111111111111111111111111111111111111111111111111111111</p>
        </div>
      </el-col>
    </el-row>
    <!-- <component v-bind:is="currentRole"> </component> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import EditorDashboard from './components/index'
import Sticky from 'views/components/sticky'

export default {
  name: 'dashboard',
  components: { EditorDashboard, Sticky },
  data() {
    return {
      currentRole: 'EditorDashboard'
    }
  }
  // computed: {
  //   ...mapGetters([
  //     'name',
  //     'avatar',
  //     'email',
  //     'introduction'
  //   ])
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-container {
  margin: 0 20px;
}
</style>
