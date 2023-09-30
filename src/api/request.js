//基于axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css';
import store from "@/store";
//创建axios实例
const requests=axios.create({
    //基础路径，发送请求的时候，路径当中会出现api
    baseURL:'/api',
    //请求超时的时间 
    timeout:5000,
});
//请求拦截器,在发请求之前，可以做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里有一个属性header请求头
    //进度条开始
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token;
    }
    //需要携带token给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token;
    }
    nProgress.start();
    return config;
});
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数，服务器响应数据回来之后，可以做一些事情
    //进度条结束
    nProgress.done();
    return res.data;
},(error)=>{
    //服务器响应失败的回调函数
    return Promise.reject(new Error('faile'));
});
//对外暴露
export default requests;