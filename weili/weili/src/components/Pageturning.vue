<template>
    <div class="pageturning cf">
        <li>上一篇 : &nbsp;
            <router-link v-if="prev.id" :to="{ name: name, params: { id: prev.id } }">{{ prev.title }}</router-link>
            <span v-else>没有了</span>
        </li>
        <li>下一篇 : &nbsp;
            <router-link v-if="next.id" :to="{ name: name, params: { id: next.id } }">{{ next.title }}</router-link>
            <span v-else>没有了</span>
        </li>
    </div>
</template>

<script>
import axios from "@/utils/request";

export default {
    props: ['name', 'table', 'id'],
    data() {
        return {
            prev: {},
            next: {}
        };
    },
    mounted() {

    },
    methods: {

    },
    watch: {
        $route: {
            handler: function () {
                axios({         // 上一条
                    url: "prev.php?table=" + this.table,
                    params: { id: this.id }
                }).then(res => {
                    this.prev = res.data ? res.data : {};
                })
                axios({         // 下一条
                    url: "next.php?table=" + this.table,
                    params: { id: this.id }
                }).then(res => {
                    console.log(res.data);
                    this.next = res.data ? res.data : {};
                })
            },
            immediate: true
        }
    }
};
</script>