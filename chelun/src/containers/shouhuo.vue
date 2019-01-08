<template>
  <div ref="wrap" class="shouhuo_wrap">
    <div class="top_box">收货地址</div>
    <div class="list_box">
      <p @click="showcitylist">
        <span>联系省市</span>
        <input type="text" :class="hasValue==true?'hide':'show'" disabled="disabled" placeholder="请选择省市">
        <span :class="hasValue==false?'hide':'show'">{{this.defaultCity}}</span>
      </p>
      <p><span>详细地址</span><input type="text" placeholder="请输入地址"></p>
      <p><span>联系电话</span><input type="text" placeholder="请输入电话"></p>
      <p><span>联系人</span><input type="text" placeholder="请输入联系人"></p>
      <!-- <p><router-link to="/echarts/index">echarts</router-link></p> -->
    </div>
    <div class="btn_box">
      <div @click="show_popup" class="hongbao"><img src="../assets/ee-icon.png"></div>
      <div class="kefu"><img src="../assets/cc-icon.png"></div>
    </div>
    <div class="bot_box">确认</div>
    <van-popup v-model="show">
      <div class="popup_wrap">
        <h3>分享后自己可得优惠卷</h3>
        <span>自己和好友都可得</span>
        <img src="../assets/coupon.png" alt="">
        <div class="end">
          <button @click="close" class="no">给钱不要</button>
          <button @click="go_show" class="yes">果断分享</button>
        </div>
      </div>
    </van-popup>
    <div class="citylist">
        <van-popup v-model="show2" position="bottom" :overlay="true">
          <div class="nav_box">
            <span @click="cancle">取消</span>
            <span @click="corfim">完成</span>
          </div>
            <van-picker ref="mypicker" :columns="columns" @change="onChange" />
        </van-popup>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Picker } from 'vant';
  Vue.use(Picker);
  import { Popup } from 'vant';
  Vue.use(Popup);
  import '../sass/shouhuo.scss'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name:"Shouhuo",
    data(){
      return {
        show:false,
        show2:true,
        arr:[],
        arrs:[],
        defaultCity:"",
        hasValue:false,
        columns: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2',
          defaultIndex: 2
        }
      ]
      }
    },
    mounted() {
      this.getCityList('https://chezhu.eclicks.cn/ExchangeJiaZhao/cityList')
      this.show2=false
    },
    computed: {
      ...mapState({
        CityList:(state)=>state.app.CityList,
        S_CityList2:(state)=>state.app.S_CityList2
      }),
      ...mapGetters({
        formatCityList:'app/formatCityList'
      })
    },
    methods: {
      ...mapActions({
        getCityList:"app/getCityList",
        selectCityList2:"app/selectCityList2",
      }),
      show_popup(){
        this.show=true
      },
      go_show(){
        this.show=false
      },
      close(){
        this.show=false
      },
      showcitylist(){
        this.show2=true
        console.log(this.CityList)
        console.log(this.formatCityList)
        if(this.formatCityList){
        this.$refs.mypicker.setColumnValues(0,this.formatCityList);
        }
        let arr=[]
        this.CityList.map((v)=>{
          if(v.name=="北京"){
            v.list[0].list.map((vv)=>{
              arr.push(vv.name)
            })
          }
        })
        if(arr){
          this.$refs.mypicker.setColumnValues(1,arr);
        }
      },
      onChange(picker, values) {
        let str=values[0]
        this.selectCityList2(str)
        this.defaultCity=`${values[0]}--${values[1]}`
        if(this.S_CityList2){
          this.$refs.mypicker.setColumnValues(1,this.S_CityList2);
        }
    },
    cancle(){
      this.show2=false;
    },
    corfim(){
      this.show2=false;
      this.hasValue=true;
    }
    },
  }
</script>
<style>
  @import url("../sass/shouhuo.scss");
</style>