<template>
    <div class="wrap">
        111
    </div>
  </template>
  
  <script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex' 
  export default {
    //计算属性
    computed: {
      ...mapState({
        num:state=>state.app.num
      }),
      ...mapGetters({
        formatNum:'app/formatNum'
      })
    },
    //挂载完成
    mounted() {
      console.log(this.$store)
    },
    //方法调用
    methods:{
      ...mapMutations({
        change:'app/change'
      }),
      ...mapActions({
        changeAsync:'app/changeAsync'
      }),
      changenum(str){
        this.change({payload:str})
      }
    }
  }
  </script>
  <style lang="scss">
  </style>
  