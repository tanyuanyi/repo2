<template>
    <div class="content_tit_type">
        <h1>{{detail.title}}</h1>
        <ul>
            <li>发布时间: {{formatDate(detail.time,1)}}</li>
            <li>浏览次数: {{detail.views}}</li>
        </ul>
        <div class="content_con_type" v-html="detail.content"></div>
        <Pageturning name="RecruitDetail" table="recruit" :id.sync="id"></Pageturning>
    </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate';
import axios from "@/utils/request";
import Pageturning from '../Pageturning.vue';

export default {
    data() {
        return {
            id: 0,
            detail: {},
        };
    },
    mounted() {

    },
    methods: {
        formatDate(time,format){
            return formatDate(time,format);
        }
    },
    watch: {
        $route: {
            handler:async function(){
                let id = this.$route.params.id;
                this.id = id;
                await axios({
                    url: "detail.php?table=recruit",
                    params: {id: this.id}
                }).then(res => {
                    this.detail = res.data;
                    this.title = this.id ? this.detail.title : '求职招聘';
                    document.title = this.title + '-南昌为力人力资源服务有限公司';
                }),
                axios({url: "views.php?table=recruit",params: {id: this.id}})
            },
            immediate: true
        }
    },
    components: {Pageturning}
};
</script>