<template>
    <header class="header" :style="{background:selectMenu.bgColor}">
        <span class="header-home">首页</span>
        <h3 class="header-title">{{selectMenu.title?selectMenu.title:"电影"}}</h3>
    </header>
</template>
<script>
export default {
    props:["selectMenu"],
}
</script>
<style lang="scss" scoped>
    .header{
        height: 1rem;
        background: #f00;
        width: 100%;
        position: fixed;
        line-height: 1rem;
        top: 0;
        left: 0;
        &-title{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            font-weight: bold;
        }
        &-home{
            margin-left: 0.2rem;
            font-size: 18px;
        }
    }
</style>
