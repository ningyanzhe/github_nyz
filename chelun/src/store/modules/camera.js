import s1 from '../../assets/s1.png'
import s2 from '../../assets/s2.png'
import s3 from '../../assets/s3.png'
import s4 from '../../assets/s4.png'
import phone from '../../assets/photo.png'
const path=require("path")
const state={
  list:[{
    text:"身份证正面",
    img:path.resolve('http://localhost:8080/src/assets/s1.png')
  },{
    text:"身份证反面",
    img:'http://localhost:8080/src/assets/s1.png'
  },{
    text:"驾驶证正件",
    img:s3
  },{
    text:"驾驶证附件",
    img:s4
  },{
    text:"白底半身照",
    img:phone
  }]
}

const getters={

}

const mutations={

}

const actions={

}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}