<template>
    <div>
        <div class="banner1">
            <img src="http://www.jxwlrl.com/images/banner2.jpg" alt="">
        </div>
        <div class="main center">
            <Title title="下载中心" desc="提供有价值的人力资源服务和解决方案，持续为客户创造价值"></Title>
            <div class="xzzx_list">
                <ul>
                    <li>
                        <dd>名称</dd>
                        <dd>发布时间</dd>
                        <dd>下载</dd>
                    </li>
                    <li v-for="item in download">
                        <dd>{{item.title}}</dd>
                        <dd>{{item.time | formatTime }}</dd>
                        <dd><a :href="'/ggqapi/upload/'+fileName(item)" :download="item.title">立即下载</a>
                        </dd>
                    </li>
                </ul>
            </div>
            <div class="paging">
            </div>
        </div>
    </div>
</div></template>

<script>
import axios from "@/utils/request";
import Title from '@/components/Title.vue';
import dayjs from 'dayjs'

export default {
    data() {
        return {
            download: [],
        };
    },
    mounted() {
        axios({
            url: "index.php?table=download"
        }).then(res => {
            this.download = res.data;
            console.log("download",this.download);
            if (this.download) {
                document.title = '下载中心' + '-南昌为力人力资源服务有限公司';
            }
        })
    },
    methods: {
        formatDate(time) {
            return formatDate(time);
        },
        fileName(item) {
            return JSON.parse(item.file).map(item => item.name);
        },
    },
    components: { Title },
    filters: {
        formatTime(time) {
            return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
        }
    },
};
</script>