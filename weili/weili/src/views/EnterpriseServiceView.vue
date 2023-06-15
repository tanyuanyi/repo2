<template>
    <div>
        <div class="banner1">
            <img src="http://www.jxwlrl.com/images/banner3.jpg" alt="banner">
        </div>
        <div class="main center">
            <div class="main_tit">
                <Title title="企业服务" desc="提供有价值的人力资源服务和解决方案，持续为客户创造价值"></Title>
                <ul>
                    <li v-for="item in enterpriseservice"><router-link :to="{ path: '/enterpriseservice', query: { id: item.id } }"
                            :class="{ on: id == item.id }">{{ item.title
                            }}</router-link></li>
                </ul>
                <div class="content_tit_type">
                    <h1>{{ detail.title }}</h1>
                    <ul>
                        <li>发布时间: {{ formatDate(detail.time, 1) }}</li>
                        <li>浏览次数: {{ detail.views }}</li>
                    </ul>
                    <div class="content_con_type" v-html="detail.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate';
import axios from "@/utils/request";;
import Title from '@/components/Title.vue';

export default {
    data() {
        return {
            enterpriseservice: [],
            id: 0,
            title: ''
        };
    },
    computed: {
        detail() {
            let res = this.enterpriseservice.filter(item => {
                item.id == this.id ? item.views++ : "";        // 浏览次数先加1,再返回当前id的数据
                return item.id == this.id;
            });
            if (res.length > 0) {
                this.title = res[0].title;
                document.title = this.title + '-南昌为力人力资源服务有限公司';
            }
            return res.length > 0 ? res[0] : {};
        }
    },
    mounted() {
        axios({
            url: "index.php?table=enterpriseservice",
            params: { id: this.id }
        }).then(res => {
            this.enterpriseservice = res.data.reverse();
            let id = this.$route.query.id;
            if (!id) {
                this.id = res.data[0].id
            }
        })
    },
    methods: {
        formatDate(time, format) {
            return formatDate(time, format);
        }
    },
    watch: {
        $route: {
            handler: function () {
                let id = this.$route.query.id;
                if (!id && this.enterpriseservice.length > 0) {
                    this.id = this.enterpriseservice[0].id
                } else if (id) {
                    this.id = id;
                }
                axios({ url: "index.php?table=enterpriseservice", params: { id: this.id } });
            },
            immediate: true
        }
    },
    components: { Title }
};
</script>