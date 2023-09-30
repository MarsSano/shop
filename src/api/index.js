//对API进行统一管理
import requests from './request';
import MockRequests from './mockAjax';
//三级联动接口
export const reqCategoryList =()=>requests({url:'/product/getBaseCategoryList',method:'get'})

//banner
export const reqGetBannerList =()=>MockRequests.get('/banner');
//floor
export const reqFloorList=()=>MockRequests.get('/floor');
//search
export const reqGetSearchInfo=(data)=>requests({url:'/list',method:'post',data})
//获取商品详情
export const reqGoodInfo=(skuid)=>requests({url:`/item/${skuid}`,method:'get'})
//将产品添加到购物车
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
//获取购物车列表
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'});
//删除购物车
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//获取验证码接口
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
//注册接口
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'});
//登录
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'});
//获取用户信息
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});
//退出登录
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'});
//修改商品的选中状态
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
//获取用户地址信息
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});
//获取订单交易页信息
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'});
//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});
//获取订单支付信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取我的订单列表
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})