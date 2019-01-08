import JSBridge from '../utils/JSBridge.js';
//上传图片
export let uploadImg = (type)=>{
  return new Promise((resolve, reject)=>{
    JSBridge.invoke('device', 'chooseImage', {
      type,
      chooseCallbackName: function(res){
        resolve(res);
      }
    })
  })
}
//分享
export let share =function(){
  JSBridge.invoke('ui', 'shareMessage')
}