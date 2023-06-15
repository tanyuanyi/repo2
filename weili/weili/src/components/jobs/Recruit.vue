<template>
    <div>
        <div class="qzzp_ms_list">
        <ul>
            <li v-for="item in recruit">
                <div>
                    <b>{{formatDate(item.time).substr(8,10)}}</b>
                    <span>{{formatDate(item.time).substr(0,7)}}</span>
                </div>
                <router-link :to="{name:'RecruitDetail',params: {id:item.id},query:{sortid:item.sortid}}">
                    <h3>{{item.title}}</h3>
                    <p>{{item.desc}}</p>
                </router-link>
            </li>
        </ul>
        </div>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="page" :page-size="size" prev-text="上一页" next-text="下一页" background
                hide-on-single-page layout="total, slot, prev, pager,next" :pager-count="11" :total="total">
                <span class="slot" @click="firstPage" v-if="firstShow">
                    首页
                </span>
            </el-pagination>
            <el-pagination :current-page.sync="page" :page-size="size" layout="slot" :pager-count="11"
                :total="total" hide-on-single-page>
                <span class="slot" @click="lastPage" v-if="lastShow">
                    末页
                </span>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";
import { formatDate } from '@/utils/formatDate';

export default {
    data() {
        return {
            recruit: {},
            sortid: 0,
            total: 0,
            size: 5,
            page: 1,
            firstShow: false,
            lastShow: true
        };
    },
    mounted() {

    },
    computed: {
        pager() {
            return Math.ceil(this.total / this.size);
        }
    },
    methods: {
        getData(){
            axios({
                url: "index.php?table=recruit",
                params: {page: this.page, limit: this.size, sortid: this.sortid}
            }).then(res => {
                console.log("快",res);
                this.recruit = res.data;
                this.total = Number(res.count);
                this.title = this.sortid ? this.recruit[0].sortname : '求职招聘';
                document.title = this.title + '-南昌为力人力资源服务有限公司';
                this.state();
            })
        },
        formatDate(time){
            return formatDate(time);
        },
        handleSizeChange(size){
            this.size = size;
            this.getData();
        },
        handleCurrentChange(page){
            this.page = page;
            this.state();
            this.getData();
        },
        firstPage(){        
            this.page = 1;
            this.state();
            this.getData();
        },
        lastPage(){         
            this.page = Math.ceil(this.total / this.size);
            this.state();
            this.getData();
        },
        state() {        
            if (this.page == this.pager || (this.pager < 12) || (this.page > this.pager-5)) {
                this.lastShow = false;
            } else {
                this.lastShow = true;
            }
            if (this.page >= 12) {
                this.firstShow = true;
            } else {
                this.firstShow = false;
            }
        }
    },
    watch: {
        $route: {
            handler: function(){
                let sortid = this.$route.query.id;
                this.sortid = sortid;
                this.page = 1;
                this.getData();
            },
            immediate: true
        }
    }
};
</script>