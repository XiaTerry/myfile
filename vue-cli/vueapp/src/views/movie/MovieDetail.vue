<template>
<div>
    <div class="moviedetail">
        <div class="moviedetail-img">
            <img :src="detail.images.large" alt="">
        </div>
        <div class="moviedetail-info">
            <h3 class="moviedetail-info-title">{{detail.original_title}}</h3>
            <div>{{detail.aka[1]}}</div>
            <div>评分：<span class="moviedetail-info-average">{{detail.rating.average}}</span></div>
            <div>{{detail.genres[2]}},{{detail.genres[1]}}</div>
            <div>{{detail.countries[0]}}</div> 
            <div>{{detail.year}}</div>
        </div>
    </div>
    <div class="detai-content">{{detail.summary}}</div>
</div>
    
</template>
<script>
export default {
    props:["detail"],
}
</script>

<style lang="scss" scoped>
    .moviedetail{
        display: flex;
        padding: 0.2rem;
        &-img{
            flex-grow: 2;
            width: 0;
            img{
                border-radius: 0.1rem;
                width: 100%;
            }
        }
        &-info{
            color: #666;
            flex-grow:2;
            width: 0;
            margin-left: 0.2rem;
            &-average{
                color:#faaf00;
                font-size: 0.34rem;
                font-weight: 700;
            }
            &-title{
                color: #000;
                font-size: 0.4rem;
                font-weight: 600;
            }
        }
    }
    .detai-content{
        padding: 0 0.2rem;
    }
</style>
