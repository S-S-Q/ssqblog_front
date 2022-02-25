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
            prop="id"
            label="IP地址"
            width="180">
        </el-table-column>

        <el-table-column
            prop="visit_Time"
            label="日期"
            width="180">
        </el-table-column>
      </el-table>
    </div>

  </el-card>
</div>

</template>

<script>
import {Message} from "element-ui";

export default {
  name: "MyStatisticsPage",
  data(){
    return{
      myChart:{},
      tableData:[],
      echartsOption: {	// echarts选项，所有绘图数据和样式都在这里设置
        tooltip: {   //鼠标放到图上的数据展示样式
          trigger: 'axis'
        },
        series: [{
          name: 'IP访问统计',
          type: 'pie',
          barWidth: '60%',
          data: [{name:"SSQ",value:2}],
        }]
      }
    }
  },
  methods:{
    getTableData(){
      this.$axios.post("/visitor/getVisitor").then(result=>{
        if(result.status===200)
        {
          if(result.data.code===200)
          {
            this.tableData=result.data.data
            console.log(result.data.data)
          }
          else
            Message.warning(result.data.message)
        }
      })
    },
    getStaticsData(){
      this.myChart = this.$echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
      this.myChart.setOption(this.echartsOption)	// echarts设置选项
      this.$axios.post("/visitor/getStaticsMsg").then(result=>{
        if(result.status===200)
        {

          if(result.data.code===200)
          {
              this.myChart.setOption({
                series : [
                  {
                    name: 'IP访问统计',
                    type: 'pie',    // 设置图表类型为饼图
                    radius: '60%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                    data:result.data.data
                  }
                ]
              })
          }
          else
            Message.warning(result.data.message)
        }

      })
    }
  },
mounted() {
  this.getStaticsData()
  this.getTableData()
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