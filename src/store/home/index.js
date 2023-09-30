import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api/index';
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const actions={
    async categoryList({commit}){
        const result=await reqCategoryList();
        if(result.code===200){
            commit('CATEGORYLIST',result.data);
        }
    },
    //首页轮播图
    async getBannerList({commit}){
        let result=await reqGetBannerList();
        if(result.code===200){
            commit('GETBANNERLIST',result.data);
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code===200){
            commit('GETFLOORLIST',result.data);
        }
    }
};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList;
    }
};
const getters={};
export default {
    state,
    mutations,
    actions,
    getters
}