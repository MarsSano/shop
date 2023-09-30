import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userinfo:{}
};
const actions={
    //获取验证码
    async getCode({commit},phone){
        let result=await reqGetCode(phone);
        if(result.code==200){
            commit('GETCODE',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result=await reqUserRegister(user);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //登录
    async userLogin({commit},data){
        let result=await reqUserLogin(data);
        if(result.code==200){
            commit('USERLOGIN',result.data.token);
            localStorage.setItem('TOKEN',result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        if(result.code==200){
            commit('GETUSERINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout({commit}){
        let result=await reqLogout();
        if(result.code==200){
            commit('CLEAR');
        }
    }
};
const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userinfo){
        state.userinfo=userinfo;
    },
    CLEAR(state){
        state.code='';
        state.userinfo={},
        localStorage.removeItem('TOKEN');
    }
};
const getters={};
export default{
    state,
    actions,
    mutations,
    getters
}