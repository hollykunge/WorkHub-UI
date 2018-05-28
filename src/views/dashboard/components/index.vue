<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :lg="16" :md="24">
        <el-row>
          <el-col :md="10" :sm="24" style="margin: 65px 0;">
            <el-card class="box-card">
              <div slot="header" class="box-card-header">
                <el-row>
                  <el-col :span="13">
                    <img class="display_avatar" :src="avatar">
                  </el-col>
                  <el-col :span="11">
                    <span class="display_name">{{ name }}</span>
                  </el-col>
                </el-row>
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
          <el-col :md="{span:12, offset:1}" :sm="24" style="">
            <ve-pie :data="pieData" :settings="pieSettings"></ve-pie>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="">
            <ve-heatmap :data="heatData"></ve-heatmap>
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="8" :md="24" style="">
        <div style="">
          <todo-list></todo-list>
        </div>
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

import VeHeatmap from 'v-charts/lib/heatmap'
import VePie from 'v-charts/lib/pie'

export default {
  name: 'dashboard-editor',
  components: { panThumb, countTo, pieChart, lineChart, barChart, todoList, VeHeatmap, VePie },
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
  created() {
    this.heatData = {
      columns: ['时间', '地点', '人数'],
      rows: [
        { '时间': '星期一', '地点': '北京', '人数': 1000 },
        { '时间': '星期二', '地点': '上海', '人数': 400 },
        { '时间': '星期三', '地点': '杭州', '人数': 800 },
        { '时间': '星期二', '地点': '深圳', '人数': 200 },
        { '时间': '星期三', '地点': '长春', '人数': 100 },
        { '时间': '星期五', '地点': '南京', '人数': 300 },
        { '时间': '星期四', '地点': '江苏', '人数': 800 },
        { '时间': '星期一', '地点': '北京', '人数': 700 },
        { '时间': '星期三', '地点': '上海', '人数': 300 },
        { '时间': '星期二', '地点': '杭州', '人数': 500 }
      ]
    }
    this.pieData = {
      columns: ['日期', '成本', '利润'],
      rows: [
        { '日期': '1月1号', '成本': 123, '利润': 3 },
        { '日期': '1月2号', '成本': 1223, '利润': 6 },
        { '日期': '1月3号', '成本': 2123, '利润': 90 },
        { '日期': '1月4号', '成本': 4123, '利润': 12 },
        { '日期': '1月5号', '成本': 3123, '利润': 15 },
        { '日期': '1月6号', '成本': 7123, '利润': 20 }
      ]
    }
    this.pieSettings = {
      limitShowNum: 5,
      legendName: {
        '其他': '别的时间的时候biu~'
      },
      legend: {
        bottom: 10
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
  .box-card {
    min-width: 330px;
    &-header {
      position: relative;
      height: 150px;
    }
  }
  .panThumb {
    z-index: 100;
    height: 150px;
    width: 150px;
    // position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .display_avatar {
    height: 125px;
    // width: 150px;
  }
  .display_name {
    font-size: 32px;
    // display: inline;
    position: absolute;
    top: 43%;
    //   left: 140px;
    //   margin: auto;
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
