<template>
    <div>
        <!-- 音乐专辑信息 -->
        <div class="album">
            <div class="album-mask" :style="{background:'url('+albumImg+') no-repeat center/cover'}"></div>
            <div class="album-img">
                <img :src="albumImg" alt="">
            </div>
            <div class="album-info">
                <h3>{{albumTitle}}</h3>
                <p>{{albumAuthor}}</p>
                <div class="album-info-control">
                    <div class="album-info-control-icon">
                        <i class="iconfont icon-yduishangyiqu" @click="prev"></i>
                        <i class="iconfont icon-play" @click="play"  v-show="!isPlay"></i>
                        <i class="iconfont icon-stop" @click="pause"  v-show="isPlay"></i>
                        <i class="iconfont icon-yduixiayiqu" @click="next"></i>
                        <i class="iconfont icon-yuanxunhuanbofang" @click="loop" v-show="isLoop"></i>
                        <i class="iconfont icon-xunhuanbofang" @click="notLoop" v-show="isloop"></i>
                    </div>
                    <span @click="toggleList=!toggleList" class="album-info-control-menu">
                        <button style="background:#009688;border-radius:0.15rem;outline:none">歌单</button>  
                    </span>
                </div>
            </div>
        </div>
        <!-- 音乐菜单 -->
        <transition name="slide">
            <ul class="music-list" v-show="toggleList">
                
                <li :class="['music-list-item',nowIndex == index?'selected':'']" v-for="(music,index) in musicList" :key="index" @click="selectedMusic(music,index)">
                <span  class="music-list-item-title">{{music.title}}</span>&nbsp;-&nbsp; 
                <span class="music-list-item-author">{{music.author}}</span>
                </li>
            </ul>
        </transition>
           <ul class="song" ref="songList" @click="toggleList=!toggleList">
               <li v-for="(list,index) in lrcList" :key="index" :class="[lrcIndex ==index?'selected': '']">
                   {{list.lrc}}
               </li>
           </ul>
        
        <!-- 播放控制 -->
        <div class="audio">
            <audio id="player" ref="musicAudio"  @play="isPlay = true" @pause="isPlay = false" :src="musicSrc" autoplay controls  class="audio-ctrl"></audio>
        </div>
       
    </div>
</template>
<script>
import '@/assets/font/iconfont.css';
import axios from 'axios';
export default {
    props:["musicList"],
    data () {
        return {
            nowIndex:-1,
            toggleList:false,
            albumImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534324016192&di=5f9745e5123e451bbaa5262ea964f437&imgtype=0&src=http%3A%2F%2Fpic.orsoon.com%2F2016%2F0503%2F20160503031530930.png',
            albumTitle:'',
            albumAuthor:'',
            musicSrc:'',
            isPlay:false,
            lrcList:[],
            // t:null,
            lrcIndex:-1,
            isLoop:true,
            isloop:false,
        }
    },
    methods:{
        selectedMusic(music,index){
            this.nowIndex = index;
        },
        next(){
            this.nowIndex--;
            if(this.nowIndex ==-1){
                this.nowIndex= this.musicList.length -1 ;
            }
        },
        prev(){
            this.nowIndex++;
            if(this.nowIndex == this.musicList.length){
                this.nowIndex = 0;
            }  
        },
        play(){
            this.$refs.musicAudio.play();
        },
        pause(){
            this.$refs.musicAudio.pause();
        },
        loop(){
            console.log(this.$refs.musicAudio.loop);
            this.$refs.musicAudio.loop =true;
            this.isloop = true;
            this.isLoop = false;
        },
        notLoop(){
            console.log(this.$refs.musicAudio.loop);
            this.$refs.musicAudio.loop = false;
            this.isloop = false;
            this.isLoop = true;
        },
        getLrc(song){
            // console.log(lrc);
            let line = song.split('\n');
            // console.log(line);
            line.forEach(elem => {
                let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
                // console.log(time);
                if(time !=null){
                    let lrc = elem.split(time)[1];
                    // console.log(lrc);
                    // console.log(time[0]);
                    let timeReg = time[0].match(/(\d{2}):(\d{2}).(\d{2})/);
                    // console.log(timeReg);
                    let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000;
                    // console.log(time2Seconds);
                    this.lrcList.push({
                        lrc:lrc,
                        time:time2Seconds
                    });
                    
                }


            });
        }
    },
     watch:{
        nowIndex(){
            let nowMusic = this.musicList[this.nowIndex];
            this.albumImg = nowMusic.musicImgSrc;
            this.albumAuthor = nowMusic.author;
            this.albumTitle = nowMusic.title;
            this.musicSrc = nowMusic.src;
            this.lrcList = [];
            this.lrcIndex = -1;
            axios.get('/'+ nowMusic.lrc).then(res=>{
                this.getLrc(res.data);
                // this.lrc = res.data;
                
            });
            //  console.log(this.lrcIndex);
        }
    },
     mounted(){
        let musicAudio =   this.$refs.musicAudio;
        musicAudio.addEventListener('timeupdate',()=>{
            let currentTime = musicAudio.currentTime;
            this.lrcList.forEach((elem,index)=>{
                if(Math.ceil(elem.time) >= currentTime && Math.floor(elem.time) < currentTime){
                    this.lrcIndex = index;
                    // console.log(Math.ceil(elem.time));
                    this.$refs.songList.scrollTop = this.lrcIndex * 25;
                    // console.log(this.$refs.songList.scrollTop);
                }
            })

        });
       musicAudio.addEventListener('ended',()=>{
           this.nowIndex++;
           if(this.nowIndex == this.musicList.length){
               this.nowIndex = 0;
           }
       });
        
     
    },
  
}
</script>
<style lang="scss" scoped>
.clearfix::after{
    content: '';
    clear: both;
    display: block;
}
i:nth-child(1){
    top: 1.2rem;
    margin-left: 2rem;
}
i:nth-child(2){
    top: 1.2rem;
    margin-left: 1rem;
}
i:nth-child(3){
    top: 1.2rem;
    margin-left: -0.7rem;
}
i:nth-child(4){
    top: 1.2rem;
    margin-left: -1.6rem;
}
i:nth-child(5){
    top: 1.2rem;
}
i:nth-child(6){
    top: 1.2rem;
    // margin-left: 0.6rem;
}
.album{
    display: flex;
    position: fixed;
    text-align: center;
    // position: relative;
    margin-bottom: 3rem;
    overflow: hidden;
    height: 2.3rem;
    width: 100%;
    color: #fff;
    &-mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter:blur(15px);
        z-index: -1;
    }
    &-img{
        padding-left: 0.1rem;
        flex-grow: 1;
        width: 0;
        img{
            width: 100%;
        }
    }
    &-info{
        width: 0;
        flex-grow: 2;
        margin-left: 0.2rem;
        &-title{
            font-size: 0.5rem;
        }
        &-control{
            // position: relative;
            &-icon{
                i{
                    font-size: 0.5rem;
                }
                .icon{
                    font-size: 0.5rem;
                }
            }
            &-menu{
                // position: absolute;
                float: right;
                font-size: 0.35rem;
                margin-right: 0.2rem;
                color: #000;
                margin-top: 0.35rem;
            }
        }
        
    }
}


.music-list{
    background: #2a2929;
    color: #fff;
    position: fixed;
    bottom:2rem;
    width: 100%;
    height: 4rem;
    overflow-y: scroll;
    border-radius: 0.1rem;
    &-item{
        color:#fff;
        padding: 0.2rem;
        border-bottom: 0.02rem solid #343433; 
        &-title{
            font-size: 0.25rem;
        }
        &-author{
            font-size: 0.1rem;
        }
        &.selected{
            color: #299557;
        }
    }

}

.slide{
    &-enter{
        transform: translateY(100%);
        &-to{
        transform: translateY(0);
        }
        &-active{
            transition: transform 1s ease-in-out;
        }
    }
    &-leave{
        transform: translateY(0);
        &-to{
        transform: translateY(100%);
        }
        &-active{
            transition: transform 1s ease-in;
        }
    }
}
.song{
    position: fixed;
    top: 3.3rem;
    left: 0;
    right: 0;
    bottom: 2.3rem;
    text-align: center;
    overflow-y: scroll;
    color: #000;
    z-index: -1;
    padding-top: 2rem;
    font-size: 0.3rem;
    .selected{
        color: #299557;
        font-size:0.4rem;
    }
}
.audio{
    background: #f1f3f4;
    height: 1rem;
    position: fixed;
    bottom: 1rem;
    width: 100%;
    &-ctrl{
        width: 100%;
    }
}
</style>
