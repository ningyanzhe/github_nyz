import Dingdan from '../containers/dingdan'
import Shouhuo from '../containers/shouhuo'
import Banli from '../containers/banli'
import Wancheng  from '../containers/wancheng'
import Echarts from '../containers/echarts'
import Chelun from "../containers/chelun"

export default [{
  path:"/",
  redirect:"/chelun"
},{
  path:"/chelun",
  component:Chelun,
  redirect:'/chelun/dingdan',
  children:[{
    path:"/chelun/dingdan",
    name:"dingdan",
    component:Dingdan
  },{
    path:"/chelun/shouhuo",
    name:"Shouhuo",
    component:Shouhuo
  },{
    path:"/chelun/banli",
    name:"Banli",
    component:Banli
  },{
    path:"/chelun/wancheng",
    name:"Wancheng",
    component:Wancheng
  }]
},{
    path:"/echarts",
    name:"Echarts",
    component:Echarts
  }]
