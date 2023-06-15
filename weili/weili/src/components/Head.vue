<template>
    <!-- 头部开始 -->
    <header>
        <div class="logo fl">
            <img src="@/assets/images/logo.png" width="100%">
        </div>
        <div class="fr">
            <p class="tel">
                全国服务热线:
                <span>0791-82203969</span>
            </p>
            <div class="search">
                <form action="">
                    <input type="text">
                    <a href="javascript:void(0)" id="searcha"><img src="@/assets/images/sou.png" alt="点击搜索"
                            width="100%"></a>
                </form>
            </div>
            <div class="lanmu">
                <ul>
                    <li>
                        <a href="" class="on">网站首页</a>
                    </li>
                    <li>
                        <router-link to="/about">关于我们</router-link>
                        <ul>
                            <li v-for="item in about">
                                <router-link :to="{ path: '/about' }">{{ item.title
                                }}</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/news">新闻资讯</router-link>
                        <ul>
                            <li v-for="item in news">
                                <router-link :to="{ path: '/news', query: { id: item.id } }">{{ item.sortname
                                }}</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/enterpriseservice">企业服务</router-link>
                        <ul>
                            <li v-for="item in enterpriseservice">
                                <router-link :to="{ path: '/enterpriseservice', query: { id: item.id } }">{{ item.title
                                }}</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/employeeservice">员工服务</router-link>
                        <ul>
                            <li v-for="item in employeeservice">
                                <router-link :to="{ path: '/employeeservice', query: { id: item.id } }">{{ item.sortname
                                }}</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/jobs">求职招聘</router-link>
                    </li>
                    <li>
                        <router-link to="/contactus">联系我们</router-link>
                    </li>
                    <li>
                        <router-link to="/download">下载中心</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <!-- 头部结束 -->
</template>
<script>
import axios from "@/utils/request";

export default {
    data() {
        return {
            path: '',
            wd: '',
            about:{},
            news: {},
            enterpriseservice: {},
            employeeservice: {},
            contactus: {}
        };
    },
    mounted() {
        axios({
            url:'index.php?table=aboutus',
        }).then(res=>{
            this.about = res.data
        })
        // 新闻资讯
        axios({
            url: "sortclass.php",
            params: { parentid: 60 }
        }).then(res => {
            this.news = res.data;
        })
        // 企业服务
        axios({
            url: "index.php?table=enterpriseservice",
        }).then(res => {
            this.enterpriseservice = res.data.reverse();
        })
        // 员工服务
        axios({
            url: "sortclass.php",
            params: { parentid: 48 }
        }).then(res => {
            this.employeeservice = res.data;
        })
        // 联系我们
        axios({
            url: "index.php?table=contactus",
        }).then(res => {
            this.contactus = res.data[0];
        })
    },
    methods: {
        search() {
            this.$router.push({ path: '/news', query: { keyword: this.wd } });    // 关键词设为参数并跳转到news页面
            this.wd = '';       // 清空关键字
        }
    },
    watch: {
        $route: {
            handler: function () {
                let path = this.$route.path;
                this.path = path;
            },
            immediate: true
        },
    }
};
</script>
