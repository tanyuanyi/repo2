<template>
    <div class="main_gcjj">
        <img src="http://www.jxwlrl.com/images/bgs.jpg" alt="">
        <div>
            <h1><span>{{ aboutus.title }}</span></h1>
            <p v-html="aboutus.content"></p>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";

export default {
    data() {
        return {
            aboutus: {}
        };
    },
    mounted() {
        axios({
            url: "index.php?table=aboutus"
        }).then(res => {
            this.aboutus = res.data.reverse()[0];
        });
    },
    methods: {
        
    },
};
</script>