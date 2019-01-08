<template>
  <div class="echarts_wrap" ref="myecharts" :style="{width: '100%', height: '100%'}">
     <div class="top">
      <div class="img">
        <!-- <img src="http://picture.eclicks.cn/g1/img/r/2018/04/18/57b25f75d97d16e0.png" alt=""> -->
        <router-view></router-view>
      </div>
      <div class="nav_box">
        <div class="nav_left"><img src="https://www.chelun.com/static/dist/img/logo.png" alt=""></div>
        <div class="button_box" @click="showfn"><van-button type="primary">导航</van-button></div>
        <div class="nav_right">
          <ul>
            <li><router-link to="/echarts/show">产品</router-link></li>
            <li><router-link to="/echarts/my">关于我们</router-link></li>
            <li><router-link to="/echarts/biglist">大数据</router-link></li>
            <li><router-link to="/echarts/news">新闻</router-link></li>
            <li><router-link to="/echarts/mans">招聘</router-link></li>
            <li><router-link to="/echarts/shop">商城</router-link></li>
            <li><span>登录/注册</span></li>
          </ul>
        </div>
        <div class="mobile_right">
            <van-popup v-model="show" position="top" :overlay="false">
                <div class="ul">
                    <p>首页</p>
                </div>
                <div class="slidetab">
                    <van-collapse v-model="activeName" accordion>
                      <van-collapse-item title="产品" >
                        <p>车轮</p>
                        <p>车轮驾考通</p>
                        <p>车轮社区</p>
                        <p>超级教练</p>
                        <p>超级驾校</p>
                        <p>车轮电动</p>
                        <p>车轮学院</p>
                      </van-collapse-item>
                    </van-collapse>
                </div>
                <p>关于我们</p>
                    <p>大数据</p>
                    <p>新闻</p>
                    <p>加入车轮</p>
            </van-popup>
        </div>
      </div>
     </div>
     <div class="bottom"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Popup,Button, Collapse, CollapseItem } from 'vant';
  Vue.use(Popup);
  Vue.use(Button);
  Vue.use(Collapse).use(CollapseItem);
export default {
  name:"Echarts",
  data(){
    return{
      show:false,
      activeName: '1',
      head_active:""
    }
  },
  mounted() {
    this.$refs.myecharts.onscroll=function(e){
      let top=e.target.scrollTop
      if(top>100){
        
      }
    }
  },
  methods: {
    showfn(){
      this.show=!this.show
    }
  },
}
</script>
<style>
@import url("../sass/echarts.scss");
</style>