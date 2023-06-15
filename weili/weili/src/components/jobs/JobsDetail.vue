<template>
    <table class="jobs_tab">
        <tr>
            <td class="td1">职位名称</td>
            <td class="td2">{{detail.name}}</td>
            <td class="td1">招聘企业</td>
            <td>{{detail.enterprise}}</td>
        </tr>
        <tr>
            <td class="td1">工作地点</td>
            <td class="td2">{{detail.place}}</td>
            <td class="td1">招聘人数</td>
            <td>{{detail.number}}</td>
        </tr>
        <tr>
            <td class="td1">学历要求</td>
            <td class="td2">{{detail.education}}</td>
            <td class="td1">薪资</td>
            <td>{{detail.salary}}</td>
        </tr>
        <tr>
            <td class="td1">岗位职责</td>
            <td colspan="3" v-html="detail.requirements"></td>
        </tr>
        <tr>
            <td class="td1">职位要求</td>
            <td colspan="3" v-html="detail.responsibilities"></td>
        </tr>
        <tr>
            <td class="td1">福利待遇</td>
            <td colspan="3" v-html="detail.welfare"></td>
        </tr>
    </table>
</template>

<script>
import axios from "@/utils/request";

export default {
    data() {
        return {
            detail: {}
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
    watch: {
        $route: {
            handler: function(){
                let id = this.$route.params.id;
                axios({
                    url: "detail.php?table=jobs",
                    params: {id: id}
                }).then(res => {
                    this.detail = res.data;
                })
            },
            immediate: true
        }
    }
};
</script>