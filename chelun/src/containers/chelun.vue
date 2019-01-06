<template>
  <div class="chelun_wrap">
      <div class="TabNav">
          <div class="Tabactive">提交订单</div>
          <div>填写收货地址</div>
          <div>正在办理</div>
          <div>办理完成</div>
        </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:"Chelun",
  data(){
    return {

    }
  }
}
</script>
<style>
</style>