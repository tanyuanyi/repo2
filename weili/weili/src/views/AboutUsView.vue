<template>
    <div>
        <div class="banner1">
            <img src="http://www.jxwlrl.com/images/banner2.jpg" alt="">
        </div>
        <div class="main center">
            <div class="main_tit">
                <Title title="关于我们" desc="坚持开源，不断创新"></Title>
                <ul>
                    <li><router-link to="/about">公司简介</router-link></li>
                    <li><router-link to="/culture">企业文化</router-link></li>
                    <li><router-link to="/honor">荣誉资质</router-link></li>
                </ul>
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>
<script>
import Aboutus from '@/components/aboutus/Aboutus.vue';
import Culture from '@/components/aboutus/Culture.vue';
import Honor from '@/components/aboutus/Honor.vue';
import Title from '@/components/Title.vue';
export default {
    data() {
        return {
            com:"Aboutus",          // 默认第一个
        };
    },
    computed: {

    },
    mounted() {

    },
    methods: {

    },
    watch: {
        $route: {
            handler: function () {
                document.title = '关于我们-南昌为力人力资源服务有限公司';
                 let path = this.$route.path.substr(1);
                 this.com = path[0].toUpperCase() + path.substr(1);       // 把path第一个字母大写
            },
            immediate: true
        }
    },
    components: { Honor,Aboutus,Culture,Title }
};
</script>
