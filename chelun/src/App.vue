<template>
  <div id="app">
    <div class="head">
      <span><i class="icon iconfont icon-fanhui"></i></span>
      <span>补换驾照</span>
      <span><i class="icon iconfont icon-caidan"></i></span>
    </div>
    <div class="content">
      <div class="TabNav">
        <div class="Tabactive">提交订单</div>
        <div>填写收货地址</div>
        <div>正在办理</div>
        <div>办理完成</div>
      </div>
      <!-- <button @click="login">登陆</button> -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import './sass/app.scss'
  import './assets/font/iconfont'
  const JSBridge = require('./utils/JSBridge.js');
  export default {
    name: 'app',
    data() {
      return {
      }
    },
    methods: {
      login() {
        //登录
        chelunJSBridge.invoke('app', 'login', {
          loginCallBackName: res => {
            console.log('res...', res);
          }
        });
      }
    }
  }
</script>

<style>
  @import url('./sass/app.scss');
  @import url('./assets/font/iconfont.css');
</style>