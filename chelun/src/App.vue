<template>
  <div id="app">
    <div class="content">
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
      // login() {
      //   //登录
      //   chelunJSBridge.invoke('app', 'login', {
      //     loginCallBackName: res => {
      //       console.log('res...', res);
      //     }
      //   });
      // }
    }
  }
</script>

<style>
  @import url('./sass/app.scss');
  @import url('./assets/font/iconfont.css');
</style>