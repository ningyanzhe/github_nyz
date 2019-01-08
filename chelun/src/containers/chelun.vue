<template>
  <div class="chelun_wrap">
      <div class="TabNav">
          <div :class="TabNum==1?'Tabactive':''"><span>提交订单</span></div>
          <div :class="TabNum==2?'Tabactive':''"><span>填写收货地址</span></div>
          <div :class="TabNum==3?'Tabactive':''"><span>正在办理</span></div>
          <div :class="TabNum==4?'Tabactive':''"><span>办理完成</span></div>
        </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:"Chelun",
  data(){
    return {
      TabNum:1
    }
  },
  mounted() {
    window.onscroll=function(){
      console.log("chelun")
    }
  },
  watch:{//监听路由变化
    $route( to , from ){     
      if(to.name=='Dingdan'){
        this.TabNum=1
      }else if(to.name=='Shouhuo'){
        this.TabNum=2
      }else if(to.name=='Banli'){
        this.TabNum=3
      }else if(to.name=='Wancheng'){
        this.TabNum=4
      }
    }
  }
}
</script>
<style>
</style>