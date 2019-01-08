import axios from 'axios'
//初始
const state={
  num:1000,
  CityList:[],
  S_CityList:[],
  S_CityList2:[],
  CityLists:[],
  C_CityLists:[],
  cost:0
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
  },
  formatCityLists:(state)=>{
    let arr=[]
    state.CityLists.map((v)=>{
      arr.push(v.name)
    })
    return arr
  },
  formatC_CityLists:(state)=>{
    let arr=[]
    state.C_CityLists.map((v)=>{
      arr.push(v.name)
    })
    return arr
  }
}

//同步
const mutations={
  change:(state,action)=>{
    state.num=action.payload=='+'?state.num+1:state.num-1
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
  },
  selectCityList2({commit},action){
    state.CityList.map((v)=>{
      if(v.name==action){
        if(v.list.length<=1){
          let arr=[]
          v.list[0].list.map((vv)=>{
            arr.push(vv.name)
          })
          state.S_CityList2=arr;
        }else{
          let arr=[]
          v.list.map((vv)=>{
            arr.push(vv.name)
          })
          state.S_CityList2=arr
        }
      }
    })
  },
  ChangeSelectCity({commit},action){
    var one;
    var two;
    state.CityList.map((v)=>{
      if(v.name==action[0]){
        one=v.id
        v.list.map((item)=>{
          if(item.name==action[1]){
            two=item.id
          }
        })
      }
    })
    //https://chezhu.eclicks.cn/ExchangeJiaZhao/getCostList?order_type=1&city_id=130200000000&province_id=130
    axios.get(`https://chezhu.eclicks.cn/ExchangeJiaZhao/getCostList?order_type=1&city_id=${two}&province_id=${one}`)
    .then(res=>{
      this.state.app.CityLists=res.data.data
    })
  },
  S_ChangeSelectCity({commit},action){
    let str=action[0];
    state.CityLists.map((v)=>{
      if(v.name==str){
        this.state.app.C_CityLists=v.list
        this.state.app.cost=v.list[0].cost
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