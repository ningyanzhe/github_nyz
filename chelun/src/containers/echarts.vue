<template>
  <div class="echarts_wrap" ref="myecharts" :style="{width: '100%', height: '100%'}">
      echarts
  </div>
</template>
<script>
export default {
  name:"Echarts",
  data(){
    return{

    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.myecharts)
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
      }
  },
}
</script>
<style>
@import url("../sass/echarts.scss");
</style>