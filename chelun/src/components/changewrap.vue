<template>
  <div class="change_wrap">
      <van-popup v-model="isshow" position="bottom" :overlay="true">
          <van-picker
            ref="picker"
            show-toolbar
            title="选择补换城市"
            :columns="list"
            @cancel="onCancel"
            @confirm="onConfirm"
            @change="change"
          />
      </van-popup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Popup, Picker} from "vant"
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  Vue.use(Popup);
  Vue.use(Picker);
  export default {
  name:"ChangeWrap",
  props:['IsShow','columns1'],
  data(){
    return {
      isshow:false,
      defaultstr:'',
      hascity:false,
      list:[{
        values:[]
      },{
        values:['--']
      },{
        values:[]
      }]
    }
  },
  created() {
    window.bus.$on("changelist",(val)=>{
      this.valuechange()
    })
  },
  computed: {
    ...mapState({
      CityLists:(state)=>state.CityLists,
      C_CityLists:(state)=>state.C_CityLists
    }),
    ...mapGetters({
      formatCityLists:'app/formatCityLists',
      formatC_CityLists:'app/formatC_CityLists'
    })
  },
  mounted() {
  },
  watch: {
    IsShow(){
      this.isshow=true
    },
  },
  methods: {
    ...mapActions({
      S_ChangeSelectCity:"app/S_ChangeSelectCity"
    }),
    onCancel(){
      this.isshow=false
    },
    onConfirm(values){
      this.isshow=false
      let str1=values[0]
      let str2=values[2]
      let endstr=`${str1}--${str2}`
      this.defaultstr=endstr
      this.hascity=true
      window.bus.$emit("replace",this.defaultstr)
    },
    change(el,values){
      this.S_ChangeSelectCity(values)
      this.$refs.picker.setColumnValues(2,this.formatC_CityLists)
    },
    valuechange(){
      if(this.$refs.picker){
        this.$refs.picker.setColumnValues(0,this.formatCityLists)
      }
    }
  }
}
</script>
<style>
  @import url("../sass/dingdan.scss");
</style>
