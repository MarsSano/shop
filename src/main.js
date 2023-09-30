import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router/index'
//引入仓库
import store from './store/index'
//统一接口api里全部请求函数
import * as API from '@/api'
import Pagination from '@/components/Pagination/index.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import Carousel from '@/components/Carousel/index.vue'
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.config.productionTip = false
//引入mock
import '@/mock/mockServe';
//引入swiper样式
import 'swiper/css/swiper.css'
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif';
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:atm,
});
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  //注册路由
  router,
  store
}).$mount('#app')
