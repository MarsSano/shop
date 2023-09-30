import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from '@/pages/Home/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import Search from '@/pages/Search/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import store from '@/store/index' 
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
let router= new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}
        },
        {
            path:'/search/:keyword?',
            component:Search,
            name:'search',
            meta:{show:true}
        },
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/detail/:skuid',
            component:Detail,
            meta:{show:true},
        },
        {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{show:true}
        },
        {
            path:'/shopcart',
            component:ShopCart,
            name:'shopcart',
            meta:{show:true}
        },
        {
            path:'/trade',
            component:Trade,
            meta:{show:true},
            //路由独享守卫
            beforeEnter:(to,from,next)=>{
                if(from.path=='/shopcart'){
                    next();
                }else{
                    next(false);
                }
            }
        },
        {
            path:'/pay',
            component:Pay,
            meta:{show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/trade'){
                    next();
                }else{
                    next(false);
                }
            }
        },
        {
            path:'/paysuccess',
            component:PaySuccess,
            meta:{show:true}
        },
        {
            path:'/center',
            component:Center,
            meta:{show:true},
            children:[
                {
                    path:'myorder',
                    component:myOrder,
                },
                {
                    path:'grouporder',
                    component:groupOrder,
                },
                {
                    path:'/center',
                    redirect:'/center/myorder',
                }
            ]
        }
    ],
    //滚动行为
    scrollBehavior(to,from,savePosition){
        return {y:0}
    }
});
//路由前置守卫
router.beforeEach(async (to,from,next)=>{
    let token=store.state.user.token;
    let name=store.state.user.userinfo.name;
    //用户已经登录
    if(token){
        //已经登录了不能再去登录页
        if(to.path=='/login'){
            next('/');
        }else{
            //去别的网页，判断是否有用户信息
            if(name){
                next();
            }else{
                //没有用户信息就获取
               try {
                await store.dispatch('getUserInfo');
                next();
               } catch (error) {
                //token失效,重新登录
                await store.dispatch('userLogout');
                next('/login');
               }
            }
        }
    }else{
        //未登录不能去交易页，支付页，个人中心
        let toPath=to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath);
        }else{
            next();
        }
    }
})
export default router;