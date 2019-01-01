<template>
  <div class="dingdan">
    <div class="swiper">
        <mt-swipe :auto="4000">
          <mt-swipe-item>1</mt-swipe-item>
          <mt-swipe-item>2</mt-swipe-item>
          <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
    </div>
    <div class="camera" @click="CameraParentFn">
      <div class="camera_one"><i class="icon iconfont icon-zhaoxiang"></i><p>身份证正面</p></div>
      <div class="camera_one"><i class="icon iconfont icon-zhaoxiang"></i><p>身份证反面</p></div>
      <div class="camera_one"><i class="icon iconfont icon-zhaoxiang"></i><p>驾驶证正件</p></div>
      <div class="camera_one"><i class="icon iconfont icon-zhaoxiang"></i><p>驾驶证附件</p></div>
      <div class="camera_one"><i class="icon iconfont icon-zhaoxiang"></i><p>白底半身照</p></div>
    </div>
    <div class="list">
      <div class="list_one"><div class="left">服务类型</div><div class="right" @click="changebook">换驾照<i class="icon iconfont icon-xiangyou"></i></div></div>
      <div class="list_one"><div class="left">当前驾照签发城市<i class="icon iconfont icon-wenhao_huabanfuben"></i></div><div class="right"><input @focus="WriteCity" type="text" placeholder="请选择签发地"></div></div>
      <div class="list_one"><div class="left">可补换的签发城市<i class="icon iconfont icon-wenhao_huabanfuben"></i></div><div class="right"><input type="text" placeholder="请选择补换地"></div></div>
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
  </div>
</template>
<script>
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
        popupVisible:true,
        slots: [
        {
          flex: 1,
          values: ['补驾照', '换驾照'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
      }
    },
    methods:{
      CameraParentFn(e){
        e.stopPropagation();
        this.sheetVisible=true
      },
      Photograph(){
        console.log("拍照")
      },
      Album(){
        console.log("相册")
      },
      changebook(e){
        e.stopPropagation();
        console.log(8)
        this.popupVisible=true
      },
      onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
        }
      },
      WriteCity(){
        console.log(233)
      }
    }
  }
</script>
<style>
  @import url("../sass/dingdan.scss");
</style>