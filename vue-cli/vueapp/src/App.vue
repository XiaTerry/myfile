<template>
  <div id="app">
    <CommonHeader :selectMenu="selectMenu"></CommonHeader>
    <router-view class="content"/>
    <CommonFooter :menuList="menuList" @changeTitle="changeTitle">
    </CommonFooter>
  </div>
</template>
<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonFooter from '@/components/CommonFooter.vue';
export default {
  components:{
    CommonHeader,
    CommonFooter,
  },
  methods:{
    changeTitle(menu){
      this.selectMenu = menu;
      
    }
  },
  data(){
    return{
      menuList:[
      {
        title:'电影',
        name:'movie',
        path:'/movie',
        bgColor:'#f00',
        icon:'icon-dianying'
      },
      {
        title:'音乐',
        name:'music',
        path:'/music',
        bgColor:'#0f0',
        icon:'icon-z'
      },
      {
        title:'书籍',
        name:'book',
        path:'/book',
        bgColor:'#00f',
        icon:'icon-shuji'
      },
      {
        title:'图片',
        name:'photo',
        path:'/photo',
        bgColor:'#ff0',
        icon:'icon-tupian'
      },
    ],
    selectMenu:{}
    }
    
  }
}
</script>

<style lang="scss">
  .content{
    margin: 1rem 0;
  }
</style>
