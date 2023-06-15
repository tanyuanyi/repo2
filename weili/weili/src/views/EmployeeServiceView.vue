<template>
    <div>
        <div class="banner1">
            <img src="http://www.jxwlrl.com/images/banner3.jpg" alt="banner">
        </div>
        <div class="main center">
            <div class="main_tit">
                <Title title="员工服务" desc="提供有价值的人力资源服务和解决方案，持续为客户创造价值"></Title>
                <ul>
                    <li v-for="item in sortclass"><router-link :to="{ path: '/employeeservice', query: { id: item.id } }"
                            :class="{ on: sortid == item.id }">{{ item.sortname
                            }}</router-link></li>
                </ul>
            </div>
            <div class="qzzp_ms_list">
                <ul>
                    <li v-for="item in news">
                        <div>
                            <b>05</b>
                            <span>2023-05</span>
                        </div>
                        <router-link :to="{ name: 'EmployeeServiceDetailView', params: { id: item.id } }">
                            <h2>{{ item.title }}</h2>
                            <p>{{ item.desc }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="block" style="text-align: center;">
                <el-pagination layout="total ,prev, pager, next, jumper" :page-size="5" :total="Number(total)"
                    @current-change="pageChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";
import Title from '@/components/Title.vue';
export default {
    data() {
        return {
            news: [],
            sortclass: [],
            total: "",
            page: 1,
            sortid: ""
        }
    },
    watch: {
        $route() {
            this.sortid = this.$route.query.id
            this.page = 1
            this.getData()
        }
    },
    methods: {
        pageChange(page) {
            this.page = page
            this.getData()
        },
        //获取新闻列表
        getData() {
            axios({
                url: 'index.php?table=employeeservice',
                params: { limit: 5, page: this.page, sortid: this.sortid }
            }).then(res => {
                this.total = res.count
                this.news = res.data
            })
        },
        //获取类别
        getSort() {
            axios({
                url: 'index.php?table=sortclass where parentid = 48',
            }).then(res => {
                this.sortclass = res.data
            })
        },
    },
    mounted() {
        this.getData()
        this.getSort()
    },
    components: { Title }
}
</script>