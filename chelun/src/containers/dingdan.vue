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
      <div v-for="(item,index) in list" class="camera_one" @click="CameraParentFn(index)">
        <div class="child">
          <img v-if="item.pic" :src="item.pic">
          <i v-if="!item.pic" class="icon iconfont icon-tianjia"></i>
        </div>
        <p>{{item.text}}</p>
      </div>
    </div>
    <div class="list">
      <div class="list_one"><div class="left">服务类型</div><div class="right" @click="changebook">{{this.tabstr}}<i class="icon iconfont icon-xiangyou"></i></div></div>
      <div class="list_one"><div class="left">当前驾照签发城市<i class="icon iconfont icon-wenhao_huabanfuben"></i></div><div class="right"><span :class="this.write_City=='请选择签发地'?'':'active'" @click="WriteCity">{{this.write_City}}</span></div></div>
      <div class="list_one"><div class="left">可补换的签发城市<i class="icon iconfont icon-wenhao_huabanfuben"></i></div><div class="right"><span :class="this.change_City=='请选择补发地'?'':'active'" @click="ChangeCity" >{{this.change_City}}</span></div></div>
    <div class="list_one" style="border:0"><div class="left">服务费</div><div class="right"><b>￥{{this.cost}}</b></div></div>
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
      <p class="p1" @click="go_question">常见问题?</p>
      <p class="p2"><i class="icon iconfont icon-kefu"></i></p>
    </div>
    <div class="foot">
      <div class="left">实付<b>￥{{this.cost}}</b></div>
      <div class="right" @click="go_nextpage">立即支付</div>
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
    <h3>选择签发城市</h3>
    <span @click="writecity_popupVisible = !writecity_popupVisible">确定</span>
  </div>
  <mt-picker :slots="writecity_slots" @change="writecity_onValuesChange"></mt-picker>
</mt-popup>
    </div>
    <div v-if="sheetVisible==true" class="pic_mask">
      <img :src="this.defaultImg" alt="">
    </div>
    <div class="change_city">
    <ChangeWrap :IsShow="IsShow" :columns1="columns1"></ChangeWrap>
    </div>
    <div class="daloag">

    </div>
    <div :class="isshow_question?'question_wrap':'question_none'">
      <Question></Question>
    </div>
  </div>
</template>
<script>
  import Question from '../components/question'
  import Vue from 'vue'
  //mint-ui
  import {uploadImg} from '../api/index.js';
  import '../assets/fonts/iconfont'
  //引入辅助方法
  import {mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  //引入样式
  import '../../node_modules/mint-ui/lib/style.css'
  import '../../node_modules/mint-ui/lib/actionsheet/index.js'
  import { Swipe, SwipeItem, Actionsheet, Popup, Picker, MessageBox} from 'mint-ui';
  import {bus} from '../main.js'
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Actionsheet.name, Actionsheet);
  Vue.component(Picker.name, Picker);
  Vue.component(Popup.name, Popup);
  //引入sass
  import '../sass/dingdan.scss'
  //引入组件
  import ChangeWrap from '../components/changewrap'
  export default {
    name: "Dingdan",
    components:{
      ChangeWrap,
      Question
    },
    created() {
      window.bus.$on("replace",(val)=>{
        this.hasChangeCity=true;
        this.change_City=val
      })
      window.bus.$on('go_back',()=>{
        this.isshow_question=false
      })
    },
    data(){
      return {
        actions:[{
          name:"拍照",
          method:this.Photograph
        },{
          name:"相册",
          method:this.Album
        }],
        columns1:[],
        //相机相册弹窗开关
        sheetVisible:false,
        //补换驾照开关
        popupVisible:false,
        //签发默认城市
        defaultCity:['北京','北京市'],
        //是否选择签发城市
        hasWriteCity:false,
        //替换文本字段
        write_City:'请选择签发地',
        change_City:'请选择补发地',
        defaultImg:'',
        //默认切换字段
        tabstr:"换驾照",
        clickindex:0,
        //签发城市弹窗开关
        writecity_popupVisible:false,
        //控制第二个城市列表开关
        IsShow:false,
        //是否选择补发城市
        hasChangeCity:false,
        isshow_question:false,
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
      list:(state)=>state.camera.list,
      cost:(state)=>state.app.cost
      }),
      ...mapGetters({
      formatCityList:'app/formatCityList',
      formatS_CityList:'app/formatS_CityList',
      formatCityLists:'app/formatCityLists'
      }),
      ComputedHasAll(){
        if(this.hasWriteCity && this.hasChangeCity){
          let num=0;
          this.list.map((v)=>{
            if(v.pic){
              num=num*1+1*1
            }
          })
          if(num==5){
            return true
          }else{
            return false
          }
        }else{
          return false
        }
      }
    },
    methods:{
      go_question(){
        this.isshow_question=true
      },
      ...mapActions({
        getCityList:"app/getCityList",
        selectCityList:"app/selectCityList",
        ChangeSelectCity:'app/ChangeSelectCity'
      }),
      ...mapMutations({
        updateList:'camera/upadteList'
      }),
      CameraParentFn(e){
        this.sheetVisible=true
        this.cameraNum=e
        this.clickindex=e
        this.defaultImg=this.list[e].img
      },

      async Photograph(){
        const type=1
      let res = await uploadImg(type);
      console.log("res",res)
      if (res.result == 1){
        this.updateList({
          src: res.data.url,
          index: this.clickindex
        })
        this.showMask = false;
      }else{
        alert('上传图片失败');
      }
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
        if(values[0]){
          this.selectCityList(values[0])
          picker.setSlotValues(1,this.formatS_CityList)
          this.write_City=values[0]+'--'+values[1]
          this.defaultCity=[values[0],values[1]]
        }
      },
      //点击签发城市选择
      WriteCity(){
        this.writecity_slots[0].values=this.formatCityList
        this.writecity_popupVisible=true
        this.hasWriteCity=true
        this.selectCityList(this.defaultCity[0])
        this.writecity_slots[2].values=this.formatS_CityList
      },
      //点击补换城市选择
      ChangeCity(){
        if(this.hasWriteCity){
        this.IsShow=this.IsShow==true?false:true
        this.ChangeSelectCity(this.defaultCity)
          this.columns1=this.formatCityLists
          window.bus.$emit("changelist",[222])
        }else{
          MessageBox('提示', '请先选择签发城市');
        }
      },
      //点击支付
      go_nextpage(){
        if(this.ComputedHasAll){
          this.$router.push({
            path:"/chelun/shouhuo"
          })
        }else{
          alert('请填写完整信息')
        }
      }
    }
  }
</script>
<style>
  @import url("../sass/dingdan.scss");
  @import url("../assets/fonts/iconfont.css");
</style>