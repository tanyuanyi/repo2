<template>
  <div id="app">
    <Head v-show="$route.path.indexOf('/admin') || $route.path == '/search'"></Head>
    <router-view/>
    <Foot v-show="$route.path.indexOf('/admin') || $route.path == '/search'"></Foot>
  </div>
</template>
<script>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
export default {
  components: {
    Head,
    Foot
  }
}
</script>
<style>
@import url("../src/assets/css/global.css");
</style>
