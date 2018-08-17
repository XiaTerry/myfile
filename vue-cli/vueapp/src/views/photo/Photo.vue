<template>
    <ul class="clearfix">
        <li class="photo" @click="gotodetail(index)" v-for="(photo,index) in  $store.state.photoList" :key="photo.src">
           <img :src="photo.src" alt="">
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
export default {
    created() {
        this.$emit('switchTab','photo');
        console.log(this.$route.path);
        axios.get('/data/photodata.json').then(res=>{
            this.$store.commit('setPhotoList',res.data.photoData);
        })
    }, 
    methods:{
        gotodetail(index){
            this.$router.push(`/photodetail/${index}`);
        }
    }
}
</script>
<style lang="scss" scoped>
    .clearfix::after{
        content: '';
        display:block;
        clear: both;
    }
    .photo{
        float: left;
        width: 50%;
    }
</style>
