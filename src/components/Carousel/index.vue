<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name:'Carousel',
    props:['list'],
    watch:{
        bannerList:{
            immediate:true,
            handler(){
                this.$nextTick(()=>{
                    new Swiper(this.$refs.mySwiper,{
                        loop:true,
                        //如果需要分页器
                        pagination:{
                            el:'.swiper-pagination',
                            //点击小球也能切换图片
                            clickable:true,
                        },
                        //如果需要前进后退按钮
                        navigation:{
                            nextEl:'.swiper-button-next',
                            prevEl:'.swiper-button-prev'
                        }
                    })
                })
            }
        },
}
}
</script>

<style lang="less" scoped>

</style>