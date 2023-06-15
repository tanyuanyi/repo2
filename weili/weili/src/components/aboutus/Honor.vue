<template>
    <div class="honor about_tit cf">
        <h1>荣誉资质<span></span></h1>
        <div class="honor_img">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in honor" :style="'height:260px;background:url('+item.pic+') center no-repeat'"></div>
                </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>