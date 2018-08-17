<template>
    <router-link to="/photo">
            <v-touch class="img"  @swipeup="swipeup" @swipedown="swipedown"  @swipeleft="swipeleft" @swiperight="swiperight"  :style="{background:'url('+imgSrc+') no-repeat center/contain #000'}"></v-touch>
    </router-link>
   
</template>

<script>
export default {
    data () {
        return {
            imgSrc:'',
            nowIndex:-1
        }
    },
    watch:{
        nowIndex(){
            let nowImg = this.$store.state.photoList[this.nowIndex];
            if(nowImg){
                this.imgSrc = nowImg.src;
            }
        }
    },
    created(){
        this.nowIndex = this.$route.params.index;
    },
    methods:{
        swipeleft(){
            this.nowIndex++;
            if(this.nowIndex == this.$store.state.photoList.length){
                this.nowIndex=0;
            }
        },
        swiperight(){
            this.nowIndex--;
            if(this.nowIndex == 0){
                this.nowIndex = this.$store.state.photoList.length - 1;
            }
        },
        swipeup(){
            this.nowIndex++;
            if(this.nowIndex == this.$store.state.photoList.length){
                this.nowIndex=0;
            }
        },
        swipedown(){
              this.nowIndex--;
            if(this.nowIndex == 0){
                this.nowIndex = this.$store.state.photoList.length - 1;
            }
        }
       
    }
}
</script>


style <style lang="scss" scoped>
.img{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // background-color: #000;

}
</style>
