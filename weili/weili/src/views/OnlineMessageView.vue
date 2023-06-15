<template>
    <div>
        <div class="banner1"></div>
        <div class="main center">
            <div class="main_tit">
                <Title title="在线留言" desc="提供有价值的人力资源服务和解决方案，持续为客户创造价值"></Title>
                <ul class="sort">
                    <li :class="{ sort_active: path == '/contactus' }">
                        <router-link :to="{ path: '/contactus' }">联系我们</router-link>
                    </li>
                    <li :class="{ sort_active: path == '/online' }">
                        <router-link :to="{ path: '/online' }">在线留言</router-link>
                    </li>
                </ul>
                <div class="zxly">
                    <div class="zxly_left">
                        <h2>我们会做的更好<br>WE WILL DO BETTER</h2>
                        <p>如果您对我们有什么建议、投诉、需求，可以通过<br>留言告诉我们，我们会在第一时间了解并及时与您联系。</p>
                        <h1>THANKS !</h1>
                    </div>
                    <div class="zxly_right">
                        <form action="">
                            <ul>
                                <li>
                                    <label for="name" class="intit">姓名 : </label>
                                    <input type="text" class="intext" name="name" id="name" v-model="online.name">
                                </li>
                                <li style="display: none;">
                                    <!-- 默认为当前提交时间,不可见 -->
                                    <label for="time" class="intit">时间 : </label>
                                    <input type="text" class="intext" name="time" id="time" :v-model="online.time">
                                </li>
                                <li>
                                    <label for="phone" class="intit">手机号码 : </label>
                                    <input type="text" class="intext" name="phone" id="phone" v-model="online.phone">
                                </li>
                                <li>
                                    <label for="content" class="intit">您的留言 : </label>
                                    <textarea name="content" id="content" cols="30" rows="10" class="will"
                                        v-model="online.content"></textarea>
                                </li>
                                <li>
                                    <!-- <input type="button" id="sub" @click="submit" value="提交"> -->
                                    <p id="sub" @click="submit">提交</p>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";;
import Title from '@/components/Title.vue';
import qs from "qs"

export default {
    data() {
        return {
            online: {},
            path: ''
        };
    },
    mounted() {
        if (this.online) {
            document.title = '在线留言' + '-南昌为力人力资源服务有限公司';
        }
    },
    methods: {
        submit() {
            const regex = /^1[3456789]\d{9}$/;
            this.online.time = Date.parse(new Date()) / 1000;      // 获取当前时间,格式化为时间戳
            if (!this.online.name) {
                alert("请输入姓名");
            } else if (!this.online.phone) {
                alert("请输入手机号码");
            } else if (!regex.test(this.online.phone)) {
                alert("手机号码有误，请重填");
            } else if (!this.online.content) {
                alert("请输入意向工作");
            } else {
                axios({
                    url: "save.php?table=online",
                    method: "post",
                    data: qs.stringify(this.online)
                }).then(res => {        // 提交结果后,弹出'提交成功'后刷新本页面
                    alert("提交成功");
                    this.online = {};      // 提交成功后清空表单
                    // location.reload();   // 提交成功后刷新本页面
                })
            }
        }
    },
    watch: {
        $route: {
            handler: function () {
                let path = this.$route.path;
                this.path = path;
            },
            immediate: true
        }
    },
    components: { Title }
};
</script>