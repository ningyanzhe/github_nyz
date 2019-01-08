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
  import {share} from '../api/index'
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
        show2:false,
        arr:[],
        arrs:[],
        defaultCity:"",
        hasValue:false,
        default1:"北京",
        default2:"北京市",
        default3:"东城区",
        ischange:false,
        columns: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2',
          defaultIndex: 0
        },
        {
          values: [],
          className: 'column3',
          defaultIndex: 0
        }
      ]
      }
    },
    created() {
      //朋友圈
      window['CHELUN_SHARE_DATA_WXTIMELINE'] = {
        title:"标题分享到朋友圈",
        imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546921617909&di=7bc95a2ee77c766dc5022b6f985621c6&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fbfcb065b6ca3ab6bf907f1afa55759ffe0dcccb6.jpg",
        type:"photo"
      }
      //好友
      window['CHELUN_SHARE_DATA_WXMESSAGE'] = {
        title:"穿越火线官网",
        desc:"来自大佬的分享",
        link:"https://cf.qq.com/",
        imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546921617909&di=7bc95a2ee77c766dc5022b6f985621c6&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fbfcb065b6ca3ab6bf907f1afa55759ffe0dcccb6.jpg"
      }
      //qq
      window['CHELUN_SHARE_DATA_QQ'] = {
        title:"",
        link:"",
        imgUrl:"",
        type:""
      }
      //微博
      window['CHELUN_SHARE_DATA_SINA'] = {
        title:"",
        link:"",
        imgUrl:"",
        type:""
      }
    },
    mounted() {
      this.getCityListAsync('https://chezhu.eclicks.cn/ExchangeJiaZhao/cityList')
      this.show2=false
    },
    computed: { 
      ...mapState({
        CityList:(state)=>state.address.CityList,
        S_CityList1:(state)=>state.address.S_CityList1,
        S_CityList2:(state)=>state.address.S_CityList2
      }),
      ...mapGetters({
        formatCityList:"address/formatCityList",
        formatS_CityList1:'address/formatS_CityList1',
        formatS_CityList2:'address/formatS_CityList2'
      })
    },
    methods: {
      ...mapActions({
        getCityListAsync:"address/getCityListAsync",
        selectCityListAsync1:"address/selectCityListAsync1",
        selectCityListAsync2:"address/selectCityListAsync2"
      }),
      ...mapMutations({
        
      }),
      show_popup(){
        this.show=true
      },
      //点击分享
      go_show(){
        this.show=false
        share()

      },
      //点击放弃
      close(){
        this.show=false
      },
      //赋值函数
      replace_value(index,value){
        this.$refs.mypicker.setColumnValues(index,value)
      },
      //显示选择器
      showcitylist(){
        this.show2=true
        setTimeout(()=>{
          this.replace_value(0,this.formatCityList)
          if(!this.ischange){
            this.replace_value(1,this.S_CityList1)
            this.replace_value(2,this.S_CityList2)
          }
        },0)
      },
      //选择器切换
      onChange(picker, values) {
          this.ischange=true
          let str1=values[0]
          let str2=values[1]
          if(this.default1!=str1){
            this.selectCityListAsync1(str1)
            this.replace_value(1,this.formatS_CityList1)
            var d1=this.$refs.mypicker.getColumnValue(0)
            this.default1=d1
            var d2=this.$refs.mypicker.getColumnValue(1)
            this.selectCityListAsync2(d2)
            this.replace_value(2,this.formatS_CityList2)
            
          }
          if(this.default2!=str2){
              this.selectCityListAsync2(str2)
              this.replace_value(2,this.formatS_CityList2)
              var d2=this.$refs.mypicker.getColumnValue(1)
              this.default2=d2
              this.selectCityListAsync2(d2)
              this.replace_value(2,this.formatS_CityList2)
            }
    },
    //点击取消
    cancle(){
      this.show2=false;
    },
    // 点击确定
    corfim(){
      this.show2=false;
      this.hasValue=true;
      let default1=this.$refs.mypicker.getColumnValue(0)
      let default2=this.$refs.mypicker.getColumnValue(1)
      let default3=this.$refs.mypicker.getColumnValue(2)
      this.defaultCity=`${default1}--${default2}--${default3}`
    }
    },
  }
</script>
<style>
  @import url("../sass/shouhuo.scss");
</style>