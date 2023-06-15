<template>
    <div>
        <div class="banner1"></div>
        <div class="main center">
            <div class="main_tit">
                <Title title="新闻资讯" desc="提供有价值的人力资源服务和解决方案，持续为客户创造价值"></Title>
                <Category :sort.sync="sortclass" :sortid.sync="sortid" :parentid="60" path="news"></Category>
                <div class="content_tit_type">
                    <h1>{{ detail.title }}</h1>
                    <ul>
                        <li>发布时间: {{ formatDate(detail.time, 1) }}</li>
                        <li>浏览次数: {{ detail.views }}</li>
                    </ul>
                    <div class="content_con_type" v-html="detail.content"></div>
                </div>
                <Pageturning name="NewsDetailView" table="news" :id.sync="id"></Pageturning>
            </div>
        </div>
    </div>
</template>

<script>
import Category from '@/components/Category.vue';
import { formatDate } from '@/utils/formatDate';
import axios from "@/utils/request";;
import Pageturning from '@/components/Pageturning.vue';
import Title from '@/components/Title.vue';

export default {
    data() {
        return {
            sortclass: [],
            sortid: 0,
            id: "",
            detail: [],
            title: ''
        };
    },
    mounted() {

    },
    methods: {
        formatDate(time, format) {
            return formatDate(time, format);
        },
        getData() {
            axios({
                url: "detail.php?table=news",
                params: { id: this.id}
            }).then(res => {
                this.detail = res.data;
                console.log(this.detail);
                this.sortid = res.data.sortid;
                this.title = this.sortid ? this.detail.title : '新闻资讯';
                document.title = this.title + '-南昌为力人力资源服务有限公司';
            })
        }
    },
    watch: {
        $route: {
            handler: function () {
                let id = this.$route.params.id;
                this.id = id;
                this.getData();
                axios({ url: "views.php?table=news", params: { id: this.id } });
            },
            immediate: true
        }
    },
    components: { Category, Pageturning, Title }
};
</script>