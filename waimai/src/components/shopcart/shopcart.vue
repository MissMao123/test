<template>
  <div class="shopBox">
    <div class="bigCircle">
      <div class="smallCircle" :class="{'nozero': totalNum>0}"  @click="showCart">
        <div class="img">
        </div>
        <div class="num" v-if="totalNum>0">
          {{totalNum}}
        </div>
      </div>
    </div>
    <p class="price">￥{{totalPrice}}</p>
    <span class="line"></span>
    <p class="delivery">另需配送费￥{{deliveryPrice}}元
    </p>
    <div class="shop_right" :class="payClass">
      {{qisong}}
    </div>

    <div class="cartList" v-show="cartShow">
      <div class="title">
        <h2>购物车</h2>
        <span @click="deleteAll">清空</span>
      </div>
      <div class="cartScroll" ref="cartList">
        <ul>
          <li v-for="item in cartArr">
            <p class="name">{{item.name}}</p>
            <div class="numP">
              <p class="price">
                <span>￥</span>
                <span>{{item.price}}</span>
              </p>
              <div class="addCar">
                <addcart :foods="item"></addcart>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import bs from 'better-scroll'
  import addcart from '@/components/addcart/addcart'
  export default {
    props:{
      cartArr:{
        type:Array
      },
      deliveryPrice:{
        type: Number,
        default: 0
      },
      minPrice:{
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        cartShow:false,
      }
    },
    created:function () {
      this.$nextTick(() => {
        this.initScroll();
      })
    },
    methods:{
      showCart(){
        this.cartShow = true
      },
      deleteAll(){
        for (let i = 0; i < this.cartArr.length; i++) {
          this.cartArr[i].num =0
        }
        this.cartShow = false
      },
      initScroll(){
        this.cartList = new bs(this.$refs.cartList, {
          click: true,
        })
      },
      reduce(){
        for (let i = 0; i < this.cartArr.length; i++) {
          if(this.cartArr[i].num == 0){
            this.cartShow = false
          }
        }
        return this.cartShow
      }
    },
    components:{
      'addcart':addcart,
    },
    computed:{
      totalNum(){
        let Num=0;
        for (let i = 0; i < this.cartArr.length; i++) {
          Num += this.cartArr[i].num
        }
        return Num
      },
      totalPrice(){
        let price =0;
        for (var i = 0; i < this.cartArr.length; i++) {
            price += this.cartArr[i].num*this.cartArr[i].price
        }
        return price
      },
      qisong(){
        if(this.totalPrice ==0){
          return `￥${this.minPrice}元起送`
        }else if(this.totalPrice<this.minPrice){
          let almost = this.minPrice - this.totalPrice
          return `还差${almost}元`
        }else {
          return `去结算`
        }
      },
      payClass(){
        if(this.totalPrice>=this.minPrice){
          return 'settlement'
        }else {
          return 'no-settlement'
        }
      }
    }
  }
</script>
<style lang="css">
  .shopBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    width: 100%;
    background: #131d26;
    position: relative;
    z-index: 4;
  }
  .shopBox .bigCircle{
    position: absolute;
    width: 51px;
    height: 51px;
    background: #131d26;
    border-radius: 50%;
    left: 18px;
    bottom: 8px;
  }
  .shopBox .smallCircle.nozero{
    background: rgb(0,160,220);
  }
  .shopBox .smallCircle.nozero .img{
    background: url('car2.png')center center no-repeat;
  }
  .shopBox .smallCircle{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #2b343c;
    position: relative;
    top: 6px;
    left: 3px;

  }
  .smallCircle .img{
    width: 100%;
    height: 100%;
    position: absolute;
    background: url('car.png')center center no-repeat;
    z-index: 10;
  }
  .shopBox .price{
    margin-left: 81px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255,0.4);
    margin-left: 81px;
  }
  .shopBox .line{
    display: block;
    width: 1px;
    height: 26px;
    background: #2c343d;
    margin: 0 12px;
  }
  .shopBox .delivery{
    flex: 1;
    font-weight: 700;
    line-height: 24px;
    font-size: 16px;
    color: rgba(255, 255, 255,0.4);
  }
  .num{
    position: relative;
    top: -4px;
    left: 22px;
    width: 24px;
    height: 16px;
    border-radius: 10px;
    background: red;
    color: white;
    font-size: 9px;
    line-height: 16px;
    text-align: center;
  }
  .shopBox .shop_right{
    width: 105px;
    height: 100%;
    background: #2b333b;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgb(255, 255, 255, 0.4);
  }
  .shopBox .shop_right.settlement{
    color: white;
    background: #4cd964;
  }
  .shopBox .cartList{
    width: 100%;
    position: fixed;
    bottom: 48px;
    background: white;
    z-index: -2;
    left: 0;
  }
  .shopBox .cartList .title{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 0 18px;
    background: #f3f5f7;
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1px solid #dbdee1;
  }
  .cartScroll{
    width: 100%;
    height: 150px;
    overflow: hidden;
  }
  .cartList .title h2{
    font-size: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
  }
  .cartList .title span{
    color: rgb(0,160,220);
    font-size: 12px;
    line-height: 40px;
  }
  .cartList ul{
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
    max-height: 217px;
    overflow: hidden;
    background: white;
  }
  .cartList ul li{
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #e6e7e8;
    justify-content: space-between;
  }
  .cartList ul li .name{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .cartList ul li .numP{
    display: flex;
    flex-direction: row;
  }
  .cartList li .numP .price{
    margin-right: 12px;
  }
  .cartList li .numP .price span:nth-child(1){
    font-size: 10px;
    color: rgb(240,20,20);
  }
  .cartList li .numP .price span:nth-child(2){
    font-size: 14px;
    color: rgb(240,20,20);
  }
</style>
