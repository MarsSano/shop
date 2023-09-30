import { reqCartList,reqDeleteCartById,reqUpdateCheckedByid } from "@/api";
const state={
    cartList:[]
};
const actions={
    //获取购物车列表数据
    async getCartList({commit}){
        let result=await reqCartList();
        if(result.code==200){
            commit('GETCARTLIST',result.data);
        }
    },
    //删除购物车
    async deleteCartListBySkuId({commit},skuId){
        let result=await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //修改购物车某个产品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedByid(skuId,isChecked);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //删除全部选中勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        let promiseAll=[];
        getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked==1){
                let promise=dispatch('deleteCartListBySkuId',item.skuId);
                promiseAll.push(promise);
            }
        });
        return Promise.all(promiseAll);
    },
    //修改全部商品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
       let promiseAll=[];
       state.cartList[0].cartInfoList.forEach(item=>{
           let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
           promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList;
    }
};
const getters={
    cartList(state){
        return state.cartList[0]||{}
    }
};
export default{
    state,
    actions,
    mutations,
    getters
}