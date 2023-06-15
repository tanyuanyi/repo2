<template>
    <div class="main_tit">
        <h2>{{title}}</h2>
        <img src="http://www.jxwlrl.com/images/jian.png" alt="">
        <p>{{desc}}</p>
    </div>
</template>

<script>
export default {
    props: ['title','desc']
};
</script>