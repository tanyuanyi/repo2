<template>
    <div>
        <div class="banner1">
            <img src="http://www.jxwlrl.com/images/banner2.jpg" alt="banner">
        </div>
        <div class="main center">
            <div class="main_tit">
                <h2>联系我们</h2>
                <img src="images/jian.png" alt="">
                <p>提供有价值的人力资源服务和解决方案，持续为客户创造价值</p>
                <ul>
                    <li class="on"><a>联系我们</a></li>
                    <!-- <li><a href="online">在线留言</a></li> -->
                    <li><router-link to="/online">在线留言</router-link></li>
                    <!-- <li><a href="">加入我们</a></li> -->
                </ul>
            </div>
            <div class="lianxi_women">
                <div class="dizhi">
                    <h5>南昌为力人力资源服务有限公司</h5>
                    <p>联系电话： 0791-82203970</p>
                    <p>QQ：512763522</p>
                    <p>邮箱： 512763522@qq.com</p>
                    <p>地址：江西省南昌市顺外路君嘉广场1号楼10楼</p>
                </div>
            </div>
            <div id="map-container">
            </div>
        </div>
    </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
    // 设置安全密钥
    securityJsCode: "dce03e4319277adab5833a8a80a0b1f6",
};
export default {
    data() {
        return {
            map: null,
        };
    },
    mounted() {
        this.initMap();
    },
    created() {
        this.initMap();
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: "9d6fbfccc96e7c9b84fe567c330bb4b2", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then((AMap) => {
                    console.log(AMap);
                    this.map = new AMap.Map("map-container", {
                        viewMode: "2D", //  是否为3D地图模式
                        zoom: 15, // 初始化地图级别
                        center: [115.944650, 28.668432], //中心点坐标
                        resizeEnable: true,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
<style scoped>
#map-container {
    overflow: hidden;
    width: 1200px;
    height: 500px;
    margin: 0;
}
</style>