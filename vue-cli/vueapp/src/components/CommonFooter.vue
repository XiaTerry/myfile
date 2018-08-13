<template>
    <ul class="footer" :style="{background:bgColor}">
        
        <li class="footer-menu" v-for="(menu,index) in menuList" :key="index">
            
            <router-link :to="menu.path" @click.native="changeTitle(menu)">
                {{menu.title}}
            </router-link>
        </li>
    </ul>
</template>
<script>
export default {
   props:["menuList"],
   data () {
       return {
            bgColor:"",      
       }
   },
   methods:{
       changeTitle(menu){
           this.bgColor = menu.bgColor;
           this.$emit('changeTitle',menu);
           console.log(menu.icon);
       }
   }
}

</script>
<style lang="scss" scoped>
    .footer{
        height: 1rem;
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        background: #f00;
        color: #fff;
        &-menu{
            flex-grow: 1;
            text-align: center;
            line-height: 1rem;
        }
        &-menu a{
            color: #fff;
            outline: none;
            font-size: 18px;
        }
    }
</style>
