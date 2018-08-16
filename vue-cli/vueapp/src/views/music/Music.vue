<template>
   <MusicPlay :musicList="musicList" ></MusicPlay>
</template>

<script>
import MusicPlay from '@/components/MusicPlay';
import axios from 'axios';
export default {
    components:{
        MusicPlay,
    },
    data () {
        return {
            musicList:[],
        }
    },
    created() {
        this.$emit('switchTab','music');
        // console.log('book');
        let url = 'https://api.myjson.com/bins/xo01o'
        let musicUrl = '/data/musicdata.json';
        axios.get(musicUrl).then(res=>{
            this.musicList = res.data.musicData;
        });
        axios.get(url).then(res=>{
            console.log(res.data.data.song.list);
        })
    },
}
</script>
<style lang="scss" scoped>

</style>
