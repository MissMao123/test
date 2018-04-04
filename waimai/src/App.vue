<template>
  <div class="app">
    <vheader></vheader>
    <div class="tab">
      <ul>
        <li> <router-link to="/goods">商品 </router-link></li>
        <li><router-link to="/ratings">评价 </router-link></li>
        <li><router-link to="/seller"> 商家</router-link></li>
      </ul>
    </div>
    <router-view :seller= "seller"></router-view>
  </div>
</template>

<script>
import header from '@/components/header/header'
export default {
  name:'App',
  data(){
    return {
      seller:{}
    }
  },
  components:{
    'vheader':header
  },
  created:function () {
    var _this = this
    this.$http.get('/api/seller').then(function(response){
      if(response.data.err == 0){
        _this.seller = response.data.data
      }
    })
  }
}
</script>

<style>
  .app{
    width: 100%;
    height: 100%;
  }
  .tab{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid rgba(7, 17, 27,0.1);
  }
  .tab ul{
    height: 40px;
    width: 100%;
    display: flex;
    /*justify-content: space-around;*/
  }
  .tab ul li{
    flex: 1;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
  }
  .tab ul .router-link-active{
    color: rgb(240,20,20);
  }

</style>
