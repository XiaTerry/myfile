<template>
<div>
     <swipe class="my-swipe">
        <swipe-item class="slide1">
            <img src="@/assets/img/book1.jpeg" alt="">
        </swipe-item>
        <swipe-item class="slide2">
            <img src="@/assets/img/book2.jpeg" alt="">
        </swipe-item>
        <swipe-item class="slide3">
            <img src="@/assets/img/book3.jpeg" alt="">
        </swipe-item>
        <swipe-item class="slide4">
            <img src="@/assets/img/book4.jpeg" alt="">
        </swipe-item>
    </swipe>
</div>
  
</template>

<script>
import axios from 'axios';
import { Swipe, SwipeItem } from 'vue-swipe';
import 'vue-swipe/dist/vue-swipe.css';
export default {
    components: {
        swipe: Swipe,
        "swipe-item": SwipeItem
    },
    data () {
        return {
            bookList:[]   
        }
    },
    created() {
        this.$emit('switchTab','book');
    },
    
}

</script>
<style lang="scss" scoped>
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  
  color: #fff;
}

.slide2 {

  color: #000;
}

.slide3 {

  color: #fff;
}
.slide4 {
  color: #fff;
}
</style>
