<template>
    <div>
        <!-- banner begin -->
        <banner>
            <img src="@/assets/images/banner_02.jpg">
        </banner>
        <!-- banner end -->
        <div class="main clearfix">
            <div class="main_zixun">
                <div class="main_zixun_title">
                    <ul>
                        <li>公司动态</li>
                        <li>行业快讯</li>
                    </ul>
                    <a href="">更多>></a>
                </div>
                <ul class="main_zixun_list">
                    <li>
                        <ul>
                            <li>
                                <a href="">
                                    <img src="">
                                    <h2>日本较大抹茶餐饮七叶和茶登陆</h2>
                                    <p>因工作需要，现面向社会公开招聘派遣至某事业单位合同制工作人员 7 名...</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="">
                                    <h2>2020年南昌市清理整顿人力资源</h2>
                                    <p>...</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="">
                                    <h2>南昌市青山湖区文化广电新闻出版旅</h2>
                                    <p>招聘办公室岗1名，会计岗1名。...</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li></li>
                </ul>
            </div>
            <div class="main_zcfg">
                <div class="main_zixun_title">
                    <ul>
                        <li>政策法规</li>
                    </ul>
                    <a href="">更多>></a>
                </div>
                <ul class="main_zcfg_list">
                    <li>欢迎社会各类性质的企事业单位与我公司合作</li>
                    <li>开展了在学校“定制”人才的提前培养计划</li>
                    <li>南昌为力人力资源服务有限公司，具有独立的法人资格</li>
                    <li>致力于为广大用户提供最</li>
                    <li>2017年产季总结暨员工表彰大会于2018年2月28日......</li>
                    <li>各类性质的企事业单位与我公司合作</li>
                    <li>离不开为了感谢员工的辛勤劳动</li>
                </ul>
            </div>
            <div class="main_tab">
                <ul>
                    <li>
                        <a href="">
                            <h2>社保查询</h2>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <h2>公积金查询</h2>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <h2>成绩查询</h2>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <h2>学历提升</h2>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <h2>招生简章</h2>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <h2>网上报名</h2>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main1 clearfix">
            <div class="main1_">
                <h2>招聘求职</h2>
                <p>江西为力人力资源服务有限公司为企业提供专业的服务外包、招聘猎头、员工福利和
                    <br>
                    人事服务等相关人力资源解决方案
                </p>
                <div class="main1_zpxx">
                    <div class="main1_zpxx_title">
                        <h3>招聘信息</h3>
                        <a href="">更多>></a>
                    </div>
                    <div class="main1_zpxx_list">
                        <img src="@/assets/images/zp1.jpg">
                        <ul>
                            <li v-for="item in jobs">
                                <router-link :to="{name:'JobsDetailView',params: { id: item.id } }">
                                    <h6>{{item.enterprise}}</h6>
                                    <p>{{item.name}}</p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="main1_zxqz">
                    <div class="main_zxqz_title">
                        <h3>在线求职</h3>
                    </div>
                    <div class="main_zxqz_form">
                        <form>
                            <ul>
                                <li>
                                    <label for="name" class="intit">姓名 : </label>
                                    <input type="text" name="names" id="names" class="intext">
                                </li>
                                <li>
                                    <span class="intit">性别 : </span>
                                    <input type="radio" name="sex" id="sex1" value="男" style="display:none;" checked="checked">
                                    <label for="sex1" onclick="this.style.background ='url(/images/radio2.jpg)  20px center no-repeat';document.getElementById('nv').style.background ='url(/images/radio1.jpg)  20px center no-repeat'" class="sex" id="nan">男</label>
                                    <input type="radio" name="sex" id="sex2" value="女" style="display:none;">
                                    <label for="sex2" onclick="this.style.background ='url(/images/radio2.jpg)  20px center no-repeat';document.getElementById('nan').style.background ='url(/images/radio1.jpg)  20px center no-repeat'" class="sex" id="nv" >女</label>
                                </li>
                                <li>
                                    <label for="mobile" class="intit">手机号码 : </label>
                                    <input type="text" name="mobile" id="mobile" class="intext">
                                </li>
                                <li>
                                    <label for="will" class="intit">意向工作 : </label>
                                    <input type="text" name="will" id="will" class="intext">
                                </li>
                                <li>
                                    <p class="sub" id="sub">提交</p>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="main2 clearfix">
            <h2>核心服务</h2>
            <p>为力人力资源服务有限公司为企业提供专业的服务外包、招聘猎头、员工福利和<br>
                人事服务等相关人力资源解决方案</p>
            <ul>
                <li>
                    <a href="">
                        <img src="@/assets/images/lwpq.jpg">
                        <h3>劳务派遣</h3>
                        <p>劳务派遣是企业将一些非核心员工外包给劳务公司，其特征就是劳动力的雇佣和...</p>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src="@/assets/images//fwwb.jpg">
                        <h3>服务外包</h3>
                        <p>劳务外包是企事业单位将某个岗位（特别是一些人员流动比较大、力资源服务...</p>
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src="@/assets/images//djsb.jpg">
                        <h3>代交社保</h3>
                        <p>社保代理是劳动保障事务代理中的一种代理方式，指由专业的人力资源公司，按照...</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";


export default {
    data() {
        return {
            banner_index: [],
            news_sortclass: [],
            news_sortid: 0,
            news_list: [],
            news_policies: [],
            jobs: [],
            message: {},     // 
            entservice: [],     // 企业服务数据
            online: {}      // 表单
        };
    },
    mounted() {
        axios({
            url: "index.php?table=jobs",
            params:{limit:6}
        }).then(res=>{
            console.log(res);
            this.jobs = res.data
        })
    },
    methods:{
    }
};
</script>