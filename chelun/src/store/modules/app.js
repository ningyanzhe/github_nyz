import axios from 'axios'
//初始
const state={
  num:1000,
  CityList:[],
  S_CityList:[]
}

//派生
const getters={
  formatNum:(state)=>{
    const re=/(?=(?!(\b))(\d{3})+$)/g;
    let newnum=state.num.toString().replace(re,",")
    return newnum
  },
  formatCityList:(state)=>{
    let arr=[]
    state.CityList.map((v)=>{
      arr.push(v.name)
    })
    return arr
  },
  formatS_CityList:(state)=>{
    let arr=[]
    state.S_CityList.map((v)=>{
      arr.push(v.name)
    })
    return arr
  }
}

//同步
const mutations={
  change:(state,action)=>{
    state.num=action.payload=='+'?state.num+1:state.num-1
  },
  citylist:(state,action)=>{

  }
}

//异步
const actions={
  changeAsync({commit}, action){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        commit({
          type: 'change',
          payload:action
        });
        resolve();
      },0);
    })
  },
  getCityList({commit},action){
    let city;
    axios.get(action)
    .then(response=>{
      this.state.app.CityList=response.data.data
    })
  },
  selectCityList({commit},action){
    state.CityList.map((v)=>{
      if(v.name==action){
        if(v.list.length<=1){
          let arr=[]
          arr.push(v.list[0])
          state.S_CityList=arr;
        }else{
          state.S_CityList=v.list
        }
      }
    })
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}