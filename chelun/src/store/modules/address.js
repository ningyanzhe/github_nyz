import axios from 'axios'

const state={
  CityList:[],
  S_CityList1:[],
  S_CityList2:[]
}

const getters={
  formatCityList:(state)=>{
    let arr=[]
    state.CityList.map((v)=>{
      arr.push(v.name)
    })
    return arr
  },
  formatS_CityList1:(state)=>{
    let arr=[]
    state.S_CityList1.map((v)=>{
      arr.push(v.name)
    })
    return arr
  },
  formatS_CityList2:(state)=>{
    let arr=[]
    state.S_CityList2.map((v)=>{
      arr.push(v.name)
    })
    return arr
  }
}

const mutations={
  getCityList:(state,action)=>{
    //
    state.CityList=action.payload
    var arr=[]
    action.payload.map((v)=>{
      if(v.name=='北京'){
        v.list[0].list.map((vv)=>{
          arr.push(vv.name)
        })
      }
    })
    //
    state.S_CityList2=arr
    //
    state.S_CityList1=['北京']
  }
}

const actions={
  getCityListAsync({commit},action){
    let city;
    axios.get(action)
    .then(response=>{
      return new Promise((resolve, reject)=>{
        commit({
          type:"getCityList",
          payload:response.data.data
        })
        resolve()
      })
    })
  },
  selectCityListAsync1:({commit},action)=>{
    state.CityList.map((v)=>{
      if(v.name==action){
        state.S_CityList1=v.list
      }
    })
  },
  selectCityListAsync2:({commit},action)=>{
    state.S_CityList1.map((v)=>{
      if(v.name==action){
        state.S_CityList2=v.list
      }
    })
  },
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}