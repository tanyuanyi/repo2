<template>
    <div>
        <div class="banner1">
            <img src="http://www.jxwlrl.com/images/banner3.jpg" alt="">
        </div>
        <div class="main center">
            <div class="main_tit">
                <Title title="求职招聘" desc="提供有价值的人力资源服务和解决方案，持续为客户创造价值"></Title>
                <ul class="sort">
                    <li :class="{ on: path.indexOf('jobs') != -1 }">
                        <router-link :to="{ path: '/jobs' }">招聘信息</router-link>
                    </li>
                    <li :class="{ on: path == 'message' }">
                        <router-link :to="{ path: '/message' }">在线求职</router-link>
                    </li>
                    <li v-for="item in sortclass" :key="item.id" :class="{ on: item.id == sortid && path == 'recruit' }">
                        <router-link :to="{ path: '/recruit', query: { id: item.id } }">{{ item.sortname }}</router-link>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";
import Title from '@/components/Title.vue';

export default {
    data() {
        return {
            sortclass: [],
            path: "",
            sortid: 0
        };
    },
    mounted() {
        axios({
            url: "sortclass.php?table=sortclass",
            params: { parentid: 3 }
        }).then(res => {
            this.sortclass = res.data;
        })
    },
    methods: {

    },
    watch: {
        $route: {
            handler: function () {
                let sortid = this.$route.query.id;
                if (sortid) {
                    this.sortid = sortid;
                    console.log(this.sortid);
                }
                let path = this.$route.path.substr(1);
                this.path = path;
                console.log(this.path);
            },
            immediate: true
        }
    },
    components: { Title }
};
</script>
