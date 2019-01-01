//初始
const state={
  num:1000
}

//派生
const getters={
  formatNum:(state)=>{
    const re=/(?=(?!(\b))(\d{3})+$)/g;
    let newnum=state.num.toString().replace(re,",")
    return newnum
  }
}

//同步
const mutations={
  change:(state,action)=>{
    console.log("a",action)
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
      }, 500);
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