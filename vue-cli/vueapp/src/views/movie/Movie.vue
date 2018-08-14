<template>
    <div>
        <div v-show="isMovie">
            <ul>
                <li class="movie" v-for="movie in movieList" :key="movie.id" @click="movieDetail(movie)">
                        <div class="movie-img">
                            <img :src="movie.images.large" alt="">
                        </div>
                        <div class="movie-info">
                            <div class="movie-info-title">{{movie.title}}</div>
                            <div>观众评 <span class="movie-info-average">{{movie.rating.average}}</span></div>
                            <div>主演：
                                <span v-for="item in movie.casts" :key="item.id">{{item.name}}&nbsp;</span>
                            </div>
                        </div>
                    
                </li>
            </ul>
            <div class="end" v-show="isEnd">
                <h3>数据到底咯！</h3>
            </div>
            <div class="loading" v-show="isLoading">
                <img src="@/assets/img/timg.gif" alt="">
            </div>
        </div>
        <MovieDetail v-show="isDetail" :detail="detail"></MovieDetail>
    </div>
    
</template>
<script>
import axios from 'axios';
import MovieDetail from './MovieDetail.vue';
export default {
    components:{
        MovieDetail,
    },
    data () {
        return {
           movieList:[], 
           isLoading:true,
           isEnd:false,
           isMovie:true,
           isDetail:false,
           detail:{}
        //    movieDetail:[],
        }
    },
    methods:{
        getData(){
        //   let movieUrl = 'https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/in_theaters';
        let movieUrl2 = 'https://api.myjson.com/bins/nn8e4';
        axios.get(movieUrl2).then(res=>{
            let getList = res.data.subjects.slice(this.movieList.length,this.movieList.length + 5);
            if(getList.length < 5){
                this.isEnd = true;
            }
            this.movieList = this.movieList.concat(getList);
            this.isLoading = false;
        });
        },
        movieDetail(movie){
            this.isMovie = false;
            this.isDetail = true;
            this.detail = movie;
            // this.$emit('movieDetail',isMovie,isDetail)
            let detailUrl = `https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/subject/${movie.id}`;
            axios.get(detailUrl).then(res=>{
                this.detail = res.data;
                // console.log(res.data);
            });
        }
    },
    beforeCreate () {
      let url = 'https://api.myjson.com/bins/uqxn0';
      axios.get(url).then(res=>{
      })  
    },
    created() {
        this.$emit('switchTab','movie');
        this.getData();
    },
    mounted(){
        window.onscroll= ()=>{
            let scrollTop = document.documentElement.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            if(scrollHeight = scrollTop + clientHeight && !this.isEnd){
                this.getData();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .movie{
        display: flex;
        padding: 0.2rem;
        &-img{
            
            flex-grow: 1;
            width: 0;
            img{
                border-radius: 0.1rem;
                width: 100%;
            }
        }
        &-info{
            color: #666;
            flex-grow:3;
            width: 0;
            margin-left: 0.2rem;
            border-bottom: 0.005rem solid #333;
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
    .loading{
        text-align: center;
        position: fixed;
        bottom: 1rem;
        width: 100%;
        img{
            width: 3rem;
        }
    }
    .end{
        text-align: center;
    }
</style>
