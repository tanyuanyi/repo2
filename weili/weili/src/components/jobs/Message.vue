<template>
    <div class="qzzp_qz">
        <img src="http://www.jxwlrl.com/images/zxqz.jpg" alt="">
        <div class="qzzp_qz_form">
            <form action="">
                <ul>
                    <li>
                        <label for="name" class="intit">姓名 : </label>
                        <input type="text" name="name" id="name" class="intext" v-model="message.name">
                    </li>
                    <li style="display: none;"> <!-- 默认为当前提交时间,不可见 -->
                        <label for="time" class="intit">时间 : </label>
                        <input type="text" name="time" id="time" class="intext" :v-model="message.time">
                    </li>
                    <li>
                        <span class="intit">性别 : </span>
                        <input type="radio" name="sex" id="sex1" value="1" style="display:none;" checked="checked"
                            v-model="message.sex">
                        <label for="sex1"
                            onclick="this.classList.add('radio2');document.getElementById('nv').classList.remove('radio2');"
                            class="sex radio2" id="nan">男</label>
                        <input type="radio" name="sex" id="sex2" value="2" style="display:none;" v-model="message.sex">
                        <label for="sex2"
                            onclick="this.classList.add('radio2');document.getElementById('nan').classList.remove('radio2');"
                            class="sex" id="nv">女</label>
                    </li>
                    <li>
                        <label for="phone" class="intit">手机号码 : </label>
                        <input type="text" name="phone" id="phone" class="intext" v-model="message.phone">
                    </li>
                    <li>
                        <label for="intention" class="intit">意向工作 : </label>
                        <textarea name="intention" id="intention" class="intext" v-model="message.intention"></textarea>
                    </li>
                    <li>
                        <p type="button" @click="submit">提交</p>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";
import qs from "qs"

export default {
    data() {
        return {
            message: {},
        };
    },
    mounted() {
        this.title = this.message ? '在线求职' : '',
            document.title = this.title + '-南昌为力人力资源服务有限公司';
    },
    methods: {
        submit() {
            const regex = /^1[3456789]\d{9}$/;
            this.message.time = Date.parse(new Date()) / 1000;      // 获取当前时间,格式化为时间戳
            if (!this.message.name) {
                alert("请输入姓名");
            } else if (!this.message.phone) {
                alert("请输入手机号码");
            } else if (!regex.test(this.message.phone)) {
                alert("手机号码有误，请重填");
            } else if (!this.message.intention) {
                alert("请输入意向工作");
            } else {
                axios({
                    url: "api/save.php?table=message",
                    method: "post",
                    data: qs.stringify(this.message)
                }).then(res => {        // 提交结果后,弹出'提交成功'后刷新本页面
                    alert("提交成功");
                    this.message = {};      // 提交成功后清空表单
                    // location.reload();   // 提交成功后刷新本页面
                })
            }
        }
    },
};
</script>