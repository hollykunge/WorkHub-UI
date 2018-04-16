<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="box-card-header">
            <pan-thumb class="panThumb" :image="avatar"> 你的权限:
              <span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
            </pan-thumb>
            <span class="display_name">{{ name }}</span>
          </div>
          <div class="info-item">
            <el-row>
              <el-col :span="12">
                <icon name="suitcase"></icon>
                <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.article_count' :duration='3400'></countTo>
                <span class="info-item-text">项目</span>
                <!--点击跳转到全部项目-->
              </el-col>
              <el-col :span="12">
                <icon name="star"></icon>
                <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.pageviews_count' :duration='3600'></countTo>
                <span class="info-item-text">浏览量</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <pie-chart></pie-chart>
      </el-col>

      <el-col :span="10">
        <bar-chart></bar-chart>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="15">
        <line-chart></line-chart>
      </el-col>
      <el-col :span="9">
        <todo-list></todo-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import panThumb from 'components/PanThumb'
import pieChart from './pieChart'
import barChart from './barChart'
import lineChart from './lineChart'
import countTo from 'vue-count-to'
import todoList from 'components/TodoList'
export default {
  name: 'dashboard-editor',
  components: { panThumb, countTo, pieChart, lineChart, barChart, todoList },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        comment_count: 102400,
        latest_article: [],
        month_article_count: 28,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-editor-container {
  padding: 20px;
  .box-card-header {
    position: relative;
    height: 160px;
  }
  .panThumb {
    z-index: 100;
    height: 150px;
    width: 150px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .display_name {
    font-size: 35px;
    display: inline;
    position: absolute;
    top: 43%;
    left: 195px;
    margin: auto;
  }
  .info-item {
    .fa-icon {
      font-size: 21px;
    }
    margin-top: 10px;
    font-size: 15px;
    &:last-of-type {
      margin-left: 15px;
    }
  }
}
</style>
