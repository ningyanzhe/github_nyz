//chelun
import Dingdan from '../containers/dingdan'
import Shouhuo from '../containers/shouhuo'
import Banli from '../containers/banli'
import Wancheng  from '../containers/wancheng'
import Echarts from '../containers/echarts'
import Chelun from "../containers/chelun"
//echarts
import Index from '../containers/echarts/index'
import Show from '../containers/echarts/show'
import My from "../containers/echarts/my"
import News from '../containers/echarts/news'
import Mans from '../containers/echarts/mans'
import Shop from '../containers/echarts/shop'
import Biglist from '../containers/echarts/biglist'

export default [{
  path:"/",
  redirect:"/chelun"
},{
  path:"/chelun",
  component:Chelun,
  redirect:'/chelun/dingdan',
  children:[{
    path:"/chelun/dingdan",
    name:"Dingdan",
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
    component:Echarts,
    children:[{
      path:"/echarts/show",
      component:Show
    },{
      path:"/echarts/index",
      component:Index
    },{
      path:"/echarts/my",
      component:My
    },{
      path:"/echarts/news",
      component:News
    },{
      path:"/echarts/mans",
      component:Mans
    },{
      path:"/echarts/biglist",
      component:Biglist
    },{
      path:"/echarts/shop",
      component:Shop
    },{
      path:"/echarts",
      redirect:"/echarts/index"
    }]
  }]
