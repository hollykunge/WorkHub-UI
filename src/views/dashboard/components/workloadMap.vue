<template>
  <div style="width:100%;height:250px;" id="workload_map_con"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'workloadMap',
  data() {
    const myDate = new Date()
    return {
      currentYear: myDate.getFullYear().toString() // 获取当前年份
    }
  },
  mounted() {
    function getVirtulData(year) {
      year = year || this.currentYear
      const date = +echarts.number.parseDate(year + '-01-01')
      const end = +echarts.number.parseDate((+year + 1) + '-01-01')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 1000)
        ])
      }
      return data
    }
    const option = {
      title: {
        show: true,
        text: '工 作 统 计',
        left: '20',
        textStyle: {
          fontSize: 30
        }
      },
      tooltip: {
        position: 'top',
        formatter: '{c}'
      },
      visualMap: {
        min: 0,
        max: 1000,
        range: [188, 520], // 预置初始显示范围
        calculable: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        inRange: {
          // color: ['#7FFFD4', '#1C86EE', '#104E8B'] // 设置热力图显示的颜色
          color: ['#eee', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
        }
      },
      calendar: {
        range: this.currentYear,
        cellSize: ['auto', 26],
        right: 25,
        yearLabel: {
          show: false
        }
      },
      series: [{
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: getVirtulData(this.currentYear)
      }]
    }
    const workloadMapCharts = echarts.init(document.getElementById('workload_map_con'))
    workloadMapCharts.setOption(option)
    window.addEventListener('resize', function() {
      workloadMapCharts.resize()
    })
  }
}
</script>