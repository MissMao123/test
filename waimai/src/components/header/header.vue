<template>
  <div class="header">
    <!-- 品牌logo -->
    <div class="headLogo">
      <img class="logo" :src="msg.avatar" alt="">
      <div class="content">
        <div class="band">
          <img src="./brand@2x.png">
          <h2>{{msg.name}}</h2>
        </div>
        <p class="delivery">{{msg.description}}/{{msg.deliveryTime}}送达</p>
        <div class="active">
          <span :class="classArr[msg.supports[0].type]"></span>
          <p>{{msg.supports[0].description}}</p>
        </div>
        <div class="five" @click="show()">
          {{msg.supports.length}}个>
        </div>
      </div>
    </div>
    <!-- 公告 -->
    <div class="notice">
      <img src="./bulletin@2x.png" alt="">
      <p>{{msg.bulletin}}</p>
      <span @click="show"> > </span>
    </div>
    <!-- 背景颜色 -->
    <div class="headBg">
      <img :src="msg.avatar" alt="">
    </div>
    <!-- 公告详情 -->
    <div class="detail" v-show="showDetail">
      <div class="wrapper clearfix">
        <div class="detailHead">
          <h3>{{msg.name}}</h3>
            <!-- 第一个参数星星的大小，第二个分数 -->
          <star :size="48" :score="msg.score">
          </star>
        </div>
        <!-- 优惠信息 -->
        <div class="info">
          <span class="line1"></span>
          <h4>优惠信息</h4>
          <span class="line2"></span>
        </div>
        <ul class="discountInfo">
            <li v-for="item in msg.supports">
              <span class="icon" :class="classArr[item.type]"></span>
              <p>{{item.description}}</p>
            </li>
        </ul>
        <!-- 商家公告 -->
        <div class="info">
          <span class="line1"></span>
          <h4>商家公告</h4>
          <span class="line2"></span>
        </div>
        <p class="bulletin">{{msg.bulletin}}</p>
      </div>
      <div class="close" @click="hide()">
        x
      </div>
    </div>
  </div>
</template>
<script>
  import star from '@/components/star/star'
  export default{
    name:"header",
    data () {
      return {
        msg:{

        },
        showDetail:false
      }
    },
    created:function () {
      var _this = this
      this.$http.get('/api/seller').then(function(response){
        if(response.data.err == 0){
          _this.msg = response.data.data
        }
      })
      this.classArr = ['decrease','discount','special','invoice','guarantee'];
    },
    components:{
      'star':star,
    },
    methods:{
      show:function(){
        this.showDetail = true;
      },
      hide:function(){
        this.showDetail=false;
      }
    }
  }
</script>
<style lang="css">
  .header{
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
  }
  .header .headBg{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .header .headBg img{
    width: 100%;
    height: 100%;
  }
  .headLogo{
    display:flex;
    padding: 24px 12px 0 24px;
    box-sizing: border-box;
  }
  .headLogo .logo{
    padding-bottom: 18px;
    border-radius: 2px;
    flex: 0;
    height: 64px;
    margin-right: 16px;
  }
  .headLogo .content{
    flex: 1;
  }
  .content{
    position: relative;
  }
  .content .five{
    cursor: pointer;
    font-size: 10px;
    font-weight: 200;
    position: absolute;
    color: rgb(255, 255, 255);
    right: 0;
    bottom: 15px;
    width: 43px;
    height: 24px;
    border-radius: 10px;
    text-align: center;
    line-height: 24px;
    padding:0 5px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.2);
  }
  .content .active{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .content .active span{
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
  }
  .content .active .decrease{
    background-image: url('decrease_1@2x.png');
  }
  .content .active .special{
    background-image: url('special_1@2x.png');
  }
  .content .active .discount{
    background-image: url('discount_1@2x.png');
  }
  .content .active .guarantee{
    background-image: url('guarantee_1@2x.png');
  }
  .content .active .invoice{
    background-image: url('invoice_1@2x.png');
  }
  .content .active p{
    font-size: 10px;
    margin-left: 4px;
    color: rgb(255, 255, 255);
  }
  .headLogo .band{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2px;
  }
  .headLogo .band img{
    flex: 0;
    margin-right: 6px;
    width: auto;
    height: 18px;
  }
  .headLogo .band h2{
    font-size: 16px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    line-height: 18px;
  }
  .content .delivery{
    color: rgb(255, 255, 255);
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin-top: 8px;
    margin-bottom: 10px;
  }
  .header .notice{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 28px;
    background: rgba(0, 0, 0, 0.2);
  }
  .header .notice img{
    flex: 0;
    height: 12px;
    width: auto;
    margin-left: 12px;
    margin-right: 4px;
  }
  .header .notice span{
    font-size: 10px;
    color: rgb(255, 255, 255);
  }
  .header .notice p{
    line-height: 28px;
    height: 100%;
    font-size: 10px;
    color: rgb(255, 255, 255);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 详情 */
  .detail{
    z-index: 22;
    position: fixed;
    background: rgba(7, 17, 27, 0.8);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 64px 36px 32px 36px;
    box-sizing: border-box;
    overflow: auto;
  }
  .detail .wrapper {
    width: 100%;
      height: 100%;
  }
  .detail .wrapper {
    height: auto;
    min-height: 100%;
  }
  .clearfix{
   display: inline-block;
  }
  .clearfix:after {
   content: ".";
   display: block;
   height: 0;
   clear: both;
   visibility: hidden;
  }
  .detail h3{
    font-size: 16px;
    color: rgb(255, 255, 255);
    line-height: 16px;
    font-weight: 700;
    text-align: center;
  }
  .detail .close{
    line-height: 32px;
    position: relative;
    width: 32px;
    height: 32px;
    margin: -32px auto 0;
    font-size: 32px;
    color: rgba(255,255,255,0.5);
    text-align: center;
    clear: both;
  }
  .detail .star{
    margin: 16px 0 28px 0;
  }
  .detail .info{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-bottom: 24px;
  }
  .detail .info span{
    display: block;
    width: 35%;
    height: 2px;
    background-color: rgba(255,255,255,0.2);
  }
  .detail .info h4{
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    margin: 0 12px;
  }
  .detail .discountInfo{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-bottom: 28px;
  }
  .detail .discountInfo li{
    margin-left: 12px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
  }
  .detail .discountInfo li:last-child{
    margin-bottom: 0;
  }
  .detail .discountInfo li .icon{
    margin: 6px;
  }
  .discountInfo span{
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
  }
  .discountInfo .decrease{
    background-image: url('decrease_1@2x.png');
  }
  .discountInfo .discount{
    background-image: url('discount_1@2x.png');
  }
  .discountInfo .guarantee{
    background-image: url('guarantee_1@2x.png');
  }
  .discountInfo .invoice{
    background-image: url('invoice_1@2x.png');
  }
  .discountInfo .special{
    background-image: url('special_1@2x.png');
  }
  .discountInfo p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(255, 255, 255);
  }
  .bulletin{
    font-size: 12px;
    font-weight: 200;
    color: rgb(255, 255, 255);
    line-height: 24px;
  }
</style>
