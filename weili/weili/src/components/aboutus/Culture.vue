<template>
    <div class="culture about_tit cf">
        <h1>企业文化<span></span></h1>
        <div v-html="culture.content" class="culture_text left"></div>
        <!-- <img :src="'/weili/upload/'+culture.pic" alt=""> -->
    </div>
</template>

<script>
import axios from "@/utils/request";

export default {
    data() {
        return {
            culture: {}
        };
    },
    mounted() {
        document.title = '企业文化-南昌为力人力资源服务有限公司';
        axios({
            url: "index.php?table=aboutus"
        }).then(res => {
            this.culture = res.data.reverse()[1];
        });
    },
    methods: {
        
    },
};
</script>