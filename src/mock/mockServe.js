import Mock from 'mockjs';
import banner from './banner';
import floor from './floor';

//mock数据,请求地址，请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//首页轮播图
Mock.mock("/mock/floor",{code:200,data:floor});
