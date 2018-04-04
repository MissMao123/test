<template lang="html">
  <div class="seller" ref="sellerList">
    <div class="sellerScroll">
      <div class="content_H">
        <div class="businessH">
          <h2>{{seller.name}}</h2>
          <div class="sale">
            <star :size="36" :score="seller.foodScore"></star>
            <p class="saleMonth">({{seller.rankRate}})</p>
            <p>月售{{seller.sellCount}}单</p>
          </div>
        </div>
        <p class="collection">
          <span class="collectionChoose" @click="changeClass" :class="{'on':love,'off':!love}"></span>
          <span>{{isCollection}}</span>
        </p>
        <p class="line1"></p>
        <ul class="distribution">
          <li>
            <p class="p1">起送价</p>
            <p class="p2">{{seller.minPrice}}<span>元</span></p>
          </li>
            <p class="line"></p>
          <li>
            <p class="p1">商家配送</p>
            <p class="p2">{{seller.deliveryPrice}}<span>元</span></p>
          </li>
            <p class="line"></p>
          <li>
            <p class="p1">平均配送时间</p>
            <p class="p2">{{seller.deliveryTime}}<span>分钟</span></p>
          </li>
        </ul>
      </div>
      <div class="blank">
      </div>
      <div class="adv">
        <h3>公告与活动</h3>
        <p>{{seller.bulletin}}</p>
      </div>
      <div class="discountC">
        <dl v-for="item in seller.supports">
          <dt class="icon" :class="classArr[item.type]"></dt>
          <dd>{{item.description}}</dd>
        </dl>
      </div>
      <div class="blank">
      </div>
      <!-- 实景 -->
      <div class="view">
        <h4>商家实景</h4>
        <div class="shijing" ref="slider">
          <ul>
            <li v-for="(item1,index) in seller.pics">
              <img :src="item1" alt="">
            </li>
          </ul>
        </div>
      </div>
      <!-- 信息 -->
      <div class="infos">
        <h2 class="adv1">商家信息</h2>
        <div class="info" v-for="item2 in seller.infos">
          <p>{{item2}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import bs from 'better-scroll'
  import star from '@/components/star/star'
  export default{
    name:"seller",
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        love:false
      }
    },
    components:{
      'star':star
    },
    created:function () {
      var _this = this
      this.$http.get('/api/seller').then(function(response){
        if(response.data.err == 0){
          _this.msg = response.data.data
        }
      })
      this.$nextTick(() => {
        this._initScroll();
        this.sellerScroll();
      })
      this.classArr = ['decrease','discount','special','invoice','guarantee'];
    },
    methods:{
      _initScroll(){
        this.slider = new bs(this.$refs.slider, {
          click: true,
          scrollX: true,
          eventPassthrough: 'vertical'
        });
      },
      sellerScroll(){
        this.sellerList = new bs(this.$refs.sellerList, {
          click: true,
        })
      },
      changeClass(){
        this.love =!this.love
      }
    },
    computed:{
      isCollection(){
        if(this.love == true){
          return `已收藏`
        }else {
          return '收藏'
        }
      }
    }
  }
</script>
<style>
  .seller{
    position: absolute;
    top:175px;
    bottom: 48px;
    overflow: hidden;
    width: 100%;
  }
  .content_H{
    width: 100%;
    padding: 18px;
    box-sizing: border-box;
    position: relative;
  }
  .businessH{
    width: 100%;
  }
  .businessH h2{
    font-size: 14px;
    line-height: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
  }
  .businessH .sale{
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .businessH .star{
    display: flex;
  }
  .businessH .sale{
    font-size: 10px;
    line-height: 18px;
    color: rgb(7,85,93);
  }
  .businessH .saleMonth{
    margin-right: 12px;
    margin-left: 8px;

  }
  .businessH .star span{
    margin-right: 7px;
  }
  .content_H .collection{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 18px;
    top: 20px;
  }
  .content_H .collection .collectionChoose{
    display: block;
    width: 22px;
    height: 22px;
    background-size: 20px;
  }
  .content_H .collection .collectionChoose.off{
    background: url('hate.png')center center no-repeat;
  }
  .content_H .collection .collectionChoose.on{
    background: url('love.png')center center no-repeat;
  }
  .collection .collectionChoose.love{
    background: url('love.png')center center no-repeat;
  }
  .collection .collectionChoose.love{
    background: url('hate.png')center center no-repeat;
  }
  .seller .line1{
    margin-top: 18px;
    width: 100%;
    height: 1px;
    background: rgba(7,17,27,0.1);
  }
  .seller .distribution{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 18px 0;
  }
  .seller .distribution li{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .distribution .p1{
    font-size: 10px;
    color: rgb(153,157,159);
    line-height: 10px;
    margin-bottom: 4px;
  }
  .distribution .p2{
    font-size: 24px;
    color: rgb(7,17,27);
    line-height: 24px;
    font-weight: 200;
  }
  .distribution .line{
    display: block;
    width: 3px ;
    height: 42px;
    background: rgba(7,17,27,0.1);
  }
  .distribution .p2 span{
    font-size: 10px;
  }
  .blank{
    width: 100%;
    height: 18px;
    background: #f3f5f7;
    border-top: 2px solid #e6e7e8;
    border-bottom: 2px solid #e6e7e8;
  }
  .adv{
    width: 100%;
    padding: 18px 18px 16px 18px;
    box-sizing: border-box;
  }
  .adv h3{
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
  }
  .adv p{
    padding: 0 12px;
    box-sizing: border-box;
    margin-top: 8px;
    color: rgb(240,20,20);
    line-height: 24px;
    font-size: 12px;
    font-weight: 200;
  }
  .adv .line2{
    display: block;
    width: 100%;
    height: 1px;
    background: rgba(7,17,27,0.1);
    margin-top: 16px;
  }
  .content .active{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .discountC{
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
  }
  .discountC dl{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 12px;
    box-sizing: border-box;
    border-top:1px solid rgba(7,17,27,0.1)
  }
  .discountC dt{
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    margin-right: 6px;
  }
  .discountC .decrease{
    background-image: url('decrease_3@2x.png');
  }
  .discountC .special{
    background-image: url('special_3@2x.png');
  }
  .discountC .discount{
    background-image: url('discount_3@2x.png');
  }
  .discountC .guarantee{
    background-image: url('guarantee_3@2x.png');
  }
  .discountC .invoice{
    background-image: url('invoice_3@2x.png');
  }
  .discountC dd{
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 16px;
  }
  .view{
    width: 100%;
    padding: 18px 0 18px 18px;
    box-sizing: border-box;
  }
  .view h4{
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    margin-bottom: 12px;
  }
  .view .shijing{
    width: 100%;
    overflow: hidden;
  }
  .view .shijing ul{
    width: 496px;
    display: flex;
    flex-direction: row;
  }
  .view .shijing ul li{
    width: 120px;
    height: 90px;
    margin-right: 6px;
  }
  .view .shijing ul li:last-child{
    margin-right: 0;
  }
  .view .shijing ul li img{
    width: 120px;
    height: 90px
  }
  .infos{
    width: 100%;
    padding: 18px;
    box-sizing: border-box;
  }
  .infos h2{
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
  }
  .infos .info{
    margin-top: 12px;
    width: 100%;
    padding: 16px 12px;
    box-sizing: border-box;
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .infos .info p{
    color: rgba(7,17,27);
    font-size: 12px;
    font-weight: 200;
    line-height: 16px;
  }
</style>
