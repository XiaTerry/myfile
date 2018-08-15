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
                    </div>
                    <span @click="toggleList=!toggleList" class="album-info-control-menu">歌单</span>
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
        <div class="song">
            <!-- {{lrc}} -->
            {{g}}
        </div>
        
        <!-- 播放控制 -->
        <div class="audio" :style="'height:'+height+';width:100%'">
            <audio id="player" ref="musicAudio"  @play="isPlay = true" @pause="isPlay = false" :src="musicSrc" autoplay controls class="audio-ctrl"></audio>
        </div>
       
    </div>
</template>
<script>
import '@/assets/font/iconfont.css';
import axios from 'axios';
export default {
    props:["musicList","musicc"],
    data () {
        return {
            nowIndex:-1,
            toggleList:true,
            albumImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534324016192&di=5f9745e5123e451bbaa5262ea964f437&imgtype=0&src=http%3A%2F%2Fpic.orsoon.com%2F2016%2F0503%2F20160503031530930.png',
            albumTitle:'',
            albumAuthor:'',
            musicSrc:'',
            g:'',
            gd:{
                up:null,
                down:null,
            },
            p:null,
            lrcObj:null,
            height:'auto',
            isPlay:false,
            lrc:'',
            Lrc:['刚好遇见你','就是爱你','广东爱情故事','我要你','最美的期待','追光者']
        }
    },
    created(){
       
    },
   
    methods:{
        selectedMusic(music,index){
            this.nowIndex = index;
            this.Lrc.forEach(item=>{
            if(music.title == item){
                axios.get(`/lrc/${item}.lrc`).then(res=>{
                this.lrc = res.data;
                console.log(typeof(res.data));
                
            })
            }
        })
        },
        next(){
            this.nowIndex--;
            if(this.nowIndex ==-1){
                this.nowIndex= this.musicList.length -1 ;
            }
            this.getLrc();
        },
        prev(){
            this.nowIndex++;
            if(this.nowIndex == this.musicList.length){
                this.nowIndex = 0;
            }  
           console.log('buffered=',this.$refs.musicAudio.played);
            console.log('duration=',this.$refs.musicAudio.duration);
            console.log((this.$refs.musicAudio.currentTime)/1000);
        },
        play(){
            this.$refs.musicAudio.play();
             console.log(this.$refs.musicAudio.currentTime);
        },
        pause(){
            this.$refs.musicAudio.pause();
        },
        getStartDate(){
            this.$refs.musicAudio.getStartDate();
        },
        getLrc(){
            var lyrics = this.lrc.split("\n");
            var lrcObj = {};
            for(var i=1;i<this.lrc.length;i++){
                var lyric = decodeURIComponent(lyrics[i]);
                // console.log(lyric);
                var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                var timeRegExpArr = lyric.match(timeReg);
                if(!timeRegExpArr)continue;
                var clause = lyric.replace(timeReg,'');
                for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                    var t = timeRegExpArr[k];
                    var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    var time = min * 60 + sec;
                    lrcObj[time] = clause;
                }
            }
            return lrcObj;
        } 
    },
    created(){
        console.log(this);
        console.log(document.getElementById("#player"));
        console.log(123);
        console.log(this.$refs.musicAudio);
        this.p = document.querySelector("#player");
        
        let _this = this;
        this.lrcObj = this.getLrc();
        console.log(this.lrcObj);
        this.p.addEventListener("timeupdate",function(){
        let obj = _this.lrcObj[Math.floor(this.currentTime)];
        if(obj!=undefined){
            _this.g = obj;
        }
        });
        this.height =window.innerHeight+'px'
        window.onresize  = ()=>{
        _this.height =window.innerHeight+'px'
        }
    },
     watch:{
        nowIndex(){
            let nowMusic = this.musicList[this.nowIndex];
            this.albumImg = nowMusic.musicImgSrc;
            this.albumAuthor = nowMusic.author;
            this.albumTitle = nowMusic.title;
            this.musicSrc = nowMusic.src;
            this.Lrc.forEach(item=>{
            if(nowMusic.title == item){
                axios.get(`/lrc/${item}.lrc`).then(res=>{
                this.lrc = res.data;
            })
            }
        })

        }
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
    margin-left: -1.5rem;
}
.album{
    display: flex;
    position: fixed;
    text-align: center;
    position: relative;
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
            &-icon{
                i{
                    font-size: 0.5rem;
                }
                .icon{
                    font-size: 0.5rem;
                }
            }
            &-menu{
                float: right;
                font-size: 0.3rem;
                margin-right: 0.8rem;
                margin-top: 0.1rem;
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
    background: blue;
    // opacity: 0.3;
    color: #000;
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
