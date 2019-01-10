<template>
  <div class="canvas_wrap">
    <input ref="inp" type="file" @change='changes'/>
    <canvas id="can" width="300" height="200" style="border:1px solid #d3d3d3;background:#ffffff;"></canvas>
  </div>
</template>
<script>
  import axios from 'axios'
export default {
  name:"Canvas",
  data(){
    return {

    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    changes(e){
        let file = e.target.files[0];
        let result=new FileReader()
        result.readAsDataURL(file)
        result.onload=()=>{
          let img=new Image()
          img.src=result.result
          let canvas=document.getElementById('can')
          let context=canvas.getContext("2d")
          context.drawImage(img,0,0,150,150)
        }
    }
  },
}
</script>
<style>

</style>