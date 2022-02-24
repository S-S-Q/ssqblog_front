<template>
<div class="wrapper">
  <el-card class="content-wrapper">
    <div class="chart">
      <div id="myChart"></div>
    </div>

    <div class="table">
      <el-table
          :data="tableData"
          border
          style="width: 100% ">
        <el-table-column
            prop="IP"
            label="IP地址"
            width="180">
        </el-table-column>

        <el-table-column
            prop="visit_time"
            label="日期"
            width="180">
        </el-table-column>
      </el-table>
    </div>

  </el-card>
</div>

</template>

<script>
export default {
  name: "MyStatisticsPage",
  data(){
    return{
      tableData:[{"IP":"127.0.0.1","visit_time":"2022-2-24"}],
      echartsOption: {	// echarts选项，所有绘图数据和样式都在这里设置
        tooltip: {   //鼠标放到图上的数据展示样式
          trigger: 'axis'
        },
        series: [{
          name: '公司市值占比',
          type: 'pie',
          barWidth: '60%',
          data: [	// 扇形图数据格式： {value, name}
            {value: 0.35, name: '腾讯'},		// value不一定是比例，echarts会自动转换
            {value: 0.2, name: '阿里巴巴'},
            {value: 0.25, name: '华为'},
            {value: 0.2, name: '字节跳动'},
          ],
        }]
      }
    }
  },
mounted ()
{
  let myChart = this.$echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
  myChart.setOption(this.echartsOption)	// echarts设置选项
}
}
</script>

<style scoped>
.wrapper{
  max-width: 848px;
  margin: 0 auto;
}

.content-wrapper{
  width: 95%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;

}

.content-wrapper .chart{
  width: 50%;
  float:left;
}

.content-wrapper .table{
  width: 50%;
  float:left;
}

#myChart{
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

</style>