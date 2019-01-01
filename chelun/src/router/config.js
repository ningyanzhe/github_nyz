import Dingdan from '../containers/dingdan'
import Shouhuo from '../containers/shouhuo'
import Banli from '../containers/banli'
import Wancheng  from '../containers/wancheng'

export default [{
  path:"/",
  name:"dingdan",
  redirect:"/dingdan"
},{
    path:"/dingdan",
    name:"dingdan",
    component:Dingdan
  },{
    path:"/shouhuo",
    name:"shouhuo",
    component:Shouhuo
  },{
    path:"/banli",
    name:"banli",
    component:Banli
  },{
    path:"/wancheng",
    name:"wancheng",
    component:Wancheng
  }]
