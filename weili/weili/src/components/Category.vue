<template>
    <ul class="sort">
        <li v-for="item in sortclass" :key="item.id" :class="{ on: item.id == sortid }">
            <router-link :to="{ path: '/' + path, query: { id: item.id } }">{{ item.sortname }}</router-link>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
    props: ["parentid", "path", "sortid"],
    data() {
        return {
            sortclass: [],
        };
    },
    async mounted() {
        await axios({
            url: "http://www.weili.com/api/sortclass.php",
            params: { parentid: this.parentid }
        }).then(res => {
            this.sortclass = res.data.data;
            this.$emit("update:sort", this.sortclass);
        })
    },
    methods: {

    },
};
</script>