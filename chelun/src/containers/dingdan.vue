<template>
  <div class="dingdan">
    <div class="swiper">
        <mt-swipe :auto="4000">
          <mt-swipe-item><img src="https://h5.chelun.com/2017/update-licence2-pay/img/banner@3x.png" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="https://h5.chelun.com/2017/update-licence2-pay/img/banner@3x.png" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="https://h5.chelun.com/2017/update-licence2-pay/img/banner@3x.png" alt=""></mt-swipe-item>
        </mt-swipe>
    </div>
    <div class="camera">
      <div class="camera_one" @click="CameraParentFn(1)"><i class="icon iconfont icon-zhaoxiang"></i><p>身份证正面</p></div>
      <div class="camera_one" @click="CameraParentFn(2)"><i class="icon iconfont icon-zhaoxiang"></i><p>身份证反面</p></div>
      <div class="camera_one" @click="CameraParentFn(3)"><i class="icon iconfont icon-zhaoxiang"></i><p>驾驶证正件</p></div>
      <div class="camera_one" @click="CameraParentFn(4)"><i class="icon iconfont icon-zhaoxiang"></i><p>驾驶证附件</p></div>
      <div class="camera_one" @click="CameraParentFn(5)"><i class="icon iconfont icon-zhaoxiang"></i><p>白底半身照</p></div>
    </div>
    <div class="list">
      <div class="list_one"><div class="left">服务类型</div><div class="right" @click="changebook">{{this.tabstr}}<i class="icon iconfont icon-xiangyou"></i></div></div>
      <div class="list_one"><div class="left">当前驾照签发城市<i class="icon iconfont icon-wenhao_huabanfuben"></i></div><div class="right"><span  @click="WriteCity">{{this.write_City}}</span></div></div>
      <div class="list_one"><div class="left">可补换的签发城市<i class="icon iconfont icon-wenhao_huabanfuben"></i></div><div class="right"><span  @click="WriteCity">请选择补换地</span></div></div>
    <div class="list_one" style="border:0"><div class="left">服务费</div><div class="right"><b>￥399</b></div></div>
    </div>
    <div class="lists">
      <div class="lists_vip">
        <div class="left"><span class="span1">成为车轮会员</span><span class="span2">每年省￥2000+，本单省￥30</span></div>
        <div class="right">
          <span class="span1">￥19.9</span>
          <span class="span2">￥9.9</span>
          <input type="checkbox">
        </div>
      </div>
      <div class="lists_marny"><div class="left">优惠</div><div class="right">无优惠劵可用<i class="icon iconfont icon-xiangyou"></i></div></div>
    </div>
    <div class="end">
      <p class="p1"><a href="#">常见问题？</a></p>
      <p class="p2"><i class="icon iconfont icon-kefu"></i></p>
    </div>
    <div class="foot">
      <div class="left">实付<b>￥399</b></div>
      <div class="right">立即支付</div>
    </div>
    <div class="mask_camera">
        <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible"
        closeOnClickModal=true>
      </mt-actionsheet>
    </div>
    <div class="tab_book">
        <mt-popup
        v-model="popupVisible"
  position="bottom">
  <div class="picker-toolbar-title">
    <div class="usi-btn-sure" @click="popupVisible = !popupVisible">完成</div>
  </div>
  <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
</mt-popup>
    </div>
    <div class="writecity">
        <mt-popup
        v-model="writecity_popupVisible"
  position="bottom">
  <div class="writecity_head">
    <span></span>
    <p>选择签发城市</p>
    <span @click="writecity_popupVisible = !writecity_popupVisible">确定</span>
  </div>
  <mt-picker :slots="writecity_slots" @change="writecity_onValuesChange"></mt-picker>
</mt-popup>
    </div>
    <div v-if="sheetVisible==true" class="pic_mask">
      <img :src="this.defaultImg" alt="">
    </div>
  </div>
</template>
<script>
  //引入辅助方法
  import {mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  //引入样式
  import '../../node_modules/mint-ui/lib/style.css'
  import '../../node_modules/mint-ui/lib/actionsheet/index.js'
  import { Swipe, SwipeItem, Actionsheet, Popup, Picker} from 'mint-ui';
  import Vue from 'vue';

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Actionsheet.name, Actionsheet);
  Vue.component(Picker.name, Picker);
  Vue.component(Popup.name, Popup);
  //引入sass
  import '../sass/dingdan.scss'
  export default {
    name: "dingdan",
    data(){
      return {
        actions:[{
          name:"拍照",
          method:this.Photograph
        },{
          name:"相册",
          method:this.Album
        }],
        sheetVisible:false,
        popupVisible:false,
        defaultCity:'北京',
        hasWriteCity:false,
        write_City:'请选择签发地',
        defaultImg:'',
        cameraNum:1,
        tabstr:"换驾照",
        writecity_popupVisible:false,
        slots: [
        {
          flex: 1,
          values: ['补驾照', '换驾照'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      writecity_slots:[
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'left'
        },{
          divider: true,
          content: '---',
          className: 'slot2'
        },{
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'right',
          defaultIndex:0
        },
      ]
      }
    },
    mounted() {
      this.getCityList('https://chezhu.eclicks.cn/ExchangeJiaZhao/cityList')
    },
    computed: {
      ...mapState({
      CityList:(state)=>state.app.CityList,
      S_CityList:(state)=>state.app.S_CityList,
      list:(state)=>state.camera.list
      }),
      ...mapGetters({
      formatCityList:'app/formatCityList',
      formatS_CityList:'app/formatS_CityList'
      })
    },
    methods:{
      ...mapActions({
        getCityList:"app/getCityList",
        selectCityList:"app/selectCityList"
      }),
      CameraParentFn(e){
        this.sheetVisible=true
        this.cameraNum=e
        this.defaultImg=this.list[e-1].img
      },
      Photograph(){
        console.log("拍照")
      },
      Album(){
        console.log("相册")
      },
      changebook(e){
        e.stopPropagation();
        this.popupVisible=true
      },
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
        }
        this.tabstr=values[0]
      },
      writecity_onValuesChange(picker, values) {
        if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
        }
       if(this.defaultCity!=values[0]){
        this.selectCityList(values[0])
        picker.setSlotValues(1,this.formatS_CityList)
        if(values[0]){
          this.write_City=values[0]+'--'+values[1]
        }
       }
      },
      WriteCity(){
        this.writecity_slots[0].values=this.formatCityList
        this.writecity_popupVisible=true
        this.selectCityList('北京')
        this.writecity_slots[2].values=this.formatS_CityList
      }
    }
  }
</script>
<style>
  @import url("../sass/dingdan.scss");
</style>