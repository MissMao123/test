<template lang="html">
  <div class="goodsD" ref="detailsList" v-show="showDetails">
    <div>
      <div class="head">
         <img :src="data.image" alt="">
      </div>
      <div class="title">
        <h1>{{data.name}}</h1>
        <p class="sale">月售{{data.sellCount}}份<span class="good">好评率{{data.rating}}%</span></p>
        <p class="price_p"><span class="price">￥</span><i>{{data.price}}</i>
        </p>
        <span class="btn">加入购物车</span>
      </div>
      <div class="blank">
      </div>
      <!-- 商品介绍 -->
      <div class="introduct">
        <h2>商品介绍</h2>
        <p>{{data.info}}</p>
      </div>
      <div class="blank">
      </div>
      <!-- 商品评价 -->
      <div class="productC">
        <h3>商品评价</h3>
        <div class="commandBtn">
          <p @click="showAll">全部{{allNum}}</p>
          <p @click="showGood">推荐{{goodNum}}</p>
          <p @click="showHate">吐槽{{hateNum}}</p>
        </div>
        <div class="choose">
          <span class="showChoose" @click="changeClass" :class="{'on':isOn,'off':!isOn}"></span>
          <p>只看有内容的评价</p>
        </div>
      </div>
      <span class="line3"></span>
      <div class="evaluates">
        <div class="evaluate" v-for="items in data.ratings" v-show="istext(items)">
          <p class="time">
            <span>{{items.rateTime/1000 | moment}}</span>
            <span>{{items.username}}  <img :src="items.avatar"/></span>
          </p>
          <p class="ping">
            <span class="great" :class="classArr[items.rateType]"></span>
            <span>{{items.text}}</span>
          </p>
        </div>
      </div>
      <div class="back" @click="hide">
      </div>
    </div>
  </div>
</template>
<script>
import bs from 'better-scroll'
export default {
  name:"goodsDetails",
  props:{
    data:{
      type:Object,
      classArr:[],
    }
  },
  data(){
    return{
      isOn:false,
      all:[],
      good:[],
      hate:[],
      isShow:false,
      isGood:false,
      isHate:false,
      showDetails:false
    }
  },
  created:function () {
    this.classArr = ['no','yes']
    this.$nextTick(() => {
      this.initScroll();
    })
  },
  methods:{
    show:function(){
      this.showDetails = true
    },
    hide:function(){
      this.showDetails = false
    },
    initScroll(){
      this.detailsList = new bs(this.$refs.detailsList, {
        click: true,
      })
    },
    changeClass(){
      this.isOn = !this.isOn
      this.isShow =  false
      this.isGood =  false
      this.isHate =  false
    },
    istext(obj){
      if(this.isOn == true){
        return obj.text
      }else{
        if(this.isShow == true){
          return true
         }else if(this.isGood == true){
           return obj.rateType == 1
         }else if(this.isHate == true){
           return obj.rateType == 0
         }else {
           return true
         }
      }
    },
    showAll(){
      this.isShow =  true
      this.isGood =  false
      this.isHate =  false
      this.isOn = false
    },
    showGood(){
      this.isGood =  true
      this.isHate =  false
      this.isShow =  false
      this.isOn=false
    },
    showHate(){
      this.isHate =  true
      this.isGood = false
      this.isShow =  false
      this.isOn=false
    }
  },
  computed:{
    allNum(){
      for (let i = 0; i < this.data.ratings.length; i++) {
        this.all.push(this.data.ratings[i])
      }
      return this.all.length
    },
    goodNum(){
      for (let i = 0; i< this.data.ratings.length; i++){
        if(this.data.ratings[i].rateType == 1){
          this.good.push(this.data.ratings[i])
        }
      }
      return this.good.length
    },
    hateNum(){
      for (let i = 0; i< this.data.ratings.length; i++){
        if(this.data.ratings[i].rateType == 0){
          this.hate.push(this.data.ratings[i])
        }
      }
      return this.hate.length
    }
  }
}
</script>
<style>
  .goodsD{
    position:fixed;
    width:100%;
    top: 0;
    left: 0;
    overflow: auto;
    background: white;
    z-index: 3;
    bottom: 48px;
  }
  .head{
    width: 100%;
  }
  .head img{
    width: 100%;
  }
  .title{
    position: relative;
    padding: 18px;
    box-sizing: border-box;
  }
  .title h1{
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    color: rgb(7,17,27)
  }
  .title .sale{
    margin-top: 8px;
    margin-bottom: 18px;
    color: rgb(147,153,159);
    font-size: 10px;
    line-height: 10px;
  }
  .title .good{
    margin-left: 12px;
  }
  .title .price{
    font-size: 10px;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .title i{
    font-style: normal;
    font-size: 14px;
    color: rgb(240,20,20);
    line-height: 24px;
  }
  .title .btn {
  position: absolute;
  right: 18px;
  font-size: 10px;
  color: #ffffff;
  bottom: 18px;
  display: block;
  width: 74px;
  height: 24px;
  background: #00a0dc;
  line-height: 24px;
  text-align: center;
  border-radius: 12px;
}
.blank{
  width: 100%;
  height: 18px;
  background: #f3f5f7;
  border-top: 2px solid #e6e7e8;
  border-bottom: 2px solid #e6e7e8;
}
.introduct{
  width: 100%;
  padding: 18px;
  box-sizing: border-box;
}
.introduct h2{
  font-size: 14px;
  font-weight: 200;
  line-height: 14px;
  color: rgb(7,17,27);
}
.introduct p{
  margin-top: 6px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 12px;
  color: rgb(77,85,93);
  font-weight: 200;
  line-height: 24px;
}
.productC{
  width: 100%;
  padding: 18px;
  box-sizing: border-box;
}
.productC h3{
  font-size: 14px;
  font-weight: 200;
  line-height: 14px;
  color: rgb(7,17,27);
}
.productC .commandBtn{
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.productC .commandBtn p{
  padding: 8px 12px;
  box-sizing: border-box;
  font-size: 14px;
  margin-right: 8px;
  border-radius: 2px;
}
.productC .commandBtn p:nth-child(1){
  background: #00a0dc;
}
.productC .commandBtn p:nth-child(2){
  background: rgba(0, 160, 220, 0.2);
}
.productC .commandBtn p:nth-child(3){
  background: #e9ebec;
}
.choose{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 15px 0;
}
.choose span{
  display: block;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-size: 20px;
}
.choose span.on{
  background: url('only_on.png')center center no-repeat;
}
.choose span.off{
  background: url('only.png')center center no-repeat;
}
.choose p{
  font-size: 14px;
  color: #93999f;
  margin-left: 6px;
}
.line3{
  display: block;
  width: 100%;
  height: 2px;
  background: #e6e7e8;
}
.evaluates{
  padding: 0 18px;
  box-sizing: border-box;
  width: 100%;
}
.evaluate{
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.evaluate .time{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.evaluate .time span{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.evaluate .time img{
  margin-left: 6px;
  width: 12px;
  border-radius: 50%;
}
.evaluate .ping{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
}
.evaluate .ping .great{
  display: block;
  width: 12px;
  height: 12px;
  background-size: 12px;
  margin: 4px;
}
.great.yes{
  background: url('yes.png')center center no-repeat;
}
.great.no{
  background: url('no.png')center center no-repeat;
}
.back{
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  left: 10px;
  background-size: 20px;
  background: url('back.png')center center no-repeat;
}
</style>
