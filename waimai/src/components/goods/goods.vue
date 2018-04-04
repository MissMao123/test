<template lang="html">
  <div class="goods">
    <!-- menu菜单 -->
      <div class="menu" ref ="menuScroll">
        <div>
          <ul v-for="(item,index) in goods" :class="{'on':index == onIndex}" ref="menulList" @click="scrollTo(index)">
            <li>
              <span class="text">
                <span class="icon" v-if="item.type>=0" :class="classArr[item.type]">
                </span>{{item.name}}
              </span>
            </li>
            <span class="line">
            </span>
          </ul>
        </div>
      </div>
    <!-- menu菜单结束 -->
    <!-- 右边menu菜单 -->
      <div class="menu_rigth" ref="listScroll">
        <div>
          <div v-for="item in goods" ref="foodsList">
            <h2>{{item.name}}</h2>
            <dl  class="rice" v-for="gg in item.foods">
              <dt @click="showD(gg)">
                <img :src="gg.image" alt="">
              </dt>
              <dd>
                <h3>{{gg.name}}</h3>
                <p class="salt">{{gg.description}}</p>
                <p class="sale">
                  <span>月售{{gg.sellCount}}份</span>
                  <span>好评率{{gg.rating}}%</span>
                </p>
                <p class="price_p">
                  <span class="price">￥</span>
                  <span class="priceSingle">{{gg.price}}</span>
                </p>
              </dd>
              <div class="addCar">
                <addcart :foods="gg"></addcart>
              </div>
            </dl>
          </div>
        </div>
      </div>
    <!-- 右边menu菜单结束 -->
    <!-- 食品详情 -->
    <goodsDetails ref="detail" :data="object"></goodsDetails>
    <!-- 食品详情结束 -->
    <!-- 购物车 -->
    <div class="shopCart">
      <shopcart :cartArr="foodsToCart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <!-- 购物车 -->
  </div>
</template>
<script>
  import goodsDetails from '@/components/goodsDetails/goodsDetails'
  import bs from 'better-scroll'
  import addcart from '@/components/addcart/addcart'
  import shopcart from '@/components/shopcart/shopcart'
  export default{
    name:"goods",
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return {
          goods:[],
          listHeight:[],
          scrollHeight:0,
          object:{}
      }
    },
    created:function () {
      var _this = this
      this.$http.get('/api/goods').then(function(response){
        if(response.data.err == 0){
          _this.goods = response.data.data
          _this.$nextTick(function(){
            _this.initscroll()
            _this.getHeight();
          })
        }
      })
      this.classArr = ['decrease','discount','special','invoice','guarantee'];
    },
    methods:{
      initscroll:function(){
        var _this = this
        this.menuScroll = new bs(this.$refs.menuScroll,{click:true,probeType:3})
        this.listScroll = new bs(this.$refs.listScroll,{click:true,probeType:3})
        this.listScroll.on('scroll',function(pos){
          _this.scrollHeight = Math.abs(Math.round(pos.y))
        })
      },
      // 计算高度
      getHeight:function(){
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < this.$refs.foodsList.length; i++) {
          height += this.$refs.foodsList[i].clientHeight
          this.listHeight.push(height)
        }
      },
      scrollTo(index){
        this.listScroll.scrollToElement(this.$refs.foodsList[index],300,0,0)
      },
      showD:function(obj){
        this.object= obj
        this.$refs.detail.show()
      }
    },
    computed:{
      onIndex(){
        for(let i=0;i<this.listHeight.length;i++){
          if(this.scrollHeight>=this.listHeight[i]&&this.scrollHeight<this.listHeight[i+1]){
            return i
          }
        }
      },
      foodsToCart:function(){
        let cartArr=[]
        for (let i = 0; i < this.goods.length; i++){
          for (let j = 0; j < this.goods[i].foods.length; j++){
            if(this.goods[i].foods[j].num > 0){
              cartArr.push(this.goods[i].foods[j])
            }
          }
        }
        return cartArr
      }
    },
    components:{
      'addcart':addcart,
      'shopcart':shopcart,
      'goodsDetails':goodsDetails
    }
  }
</script>
<style lang="less">
  .shopCart{
    position: fixed;
    bottom: 0;
    height: 48px;
    width: 100%;
    z-index: 24;
  }
  .goods{
    width: 100%;
    display: flex;
    position: absolute;
    overflow: hidden;
    top: 175px;
    bottom: 48px;
    left: 0;
  }
  /* menu菜单 */
  .goods .menu{
    flex: 0 0 80px;
    width: 80px;
    height: 100%;
  }
  .goods .menu ul{
    background: #f3f5f7;
    &.on{
      background: white;
      color: rgb(7,17,27);
    }
  }
  .goods .menu ul li{
    width: 100%;
    padding: 0 12px;
    height: 54px;
    display: table;
    box-sizing: border-box;
  }
  .menu li .icon{
    display: inline-block;
    margin-right: 2px;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    /* vertical-align: top; */
    position: relative;
    top: 2px;
  }
  .menu .decrease{
    background: url('decrease_3@2x.png');
  }
  .menu .discount{
    background: url('discount_3@2x.png');
  }
  .menu .guarantee{
    background: url('guarantee_3@2x.png');
  }
  .menu .invoice{
    background: url('invoice_3@2x.png');
  }
  .menu .special{
    background: url('special_3@2x.png');
  }
  .menu .text{
    display: table-cell;
    vertical-align: middle;
    font-size: 12px;
    color: #07111b;
    width: 100%;
  }
  .menu .line{
    display: block;
    width: 56px;
    height: 1px;
    background: rgba(7,17,27,0.1);
    margin: 0 auto;
  }
  .menu ul:last-child .line{
    display: none;
  }
  /* menu菜单结束 */
  /* 右边menu菜单 */
  .menu_rigth{
    flex:1;
    width: 100%;
  }
  .menu_rigth h2{
    font-size: 12px;
    color: #93999f;
    border-left: 2px solid #d9dde1;
    padding-left: 14px;
    line-height: 26px;
    background: #f3f5f7;
  }
  .menu_rigth .rice{
    position:relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 18px;
    box-sizing: border-box;
  }
  .menu_rigth .rice dd{
    flex: 1;
    margin-left: 10px;
  }
  .menu_rigth .rice dd h3{
    font-size: 14px;
    line-height: 14px;
    color: #07111b;
    font-weight: 200;
  }
  .menu_rigth .rice dd .salt{
    font-size: 10px;
    line-height: 14px;
    color: #93999f;
    margin-top: 8px;
  }
  .menu_rigth .rice dd .sale{
    font-size: 10px;
    line-height: 10px;
    color: #93999f;
    margin-top: 8px;
  }
  .menu_rigth .price_p{
    margin-top: 8px;
    display: flex;
    flex-direction: row;
  }
  .menu_rigth .price_p .price{
    display: block;
    line-height: 24px;
    font-size:10px ;
    color: #f01414;
    margin-top: 2px;
  }
  .menu_rigth .price_p .priceSingle{
    font-size: 14px;
    color: #f01414;
    line-height: 24px;
    font-weight: 700;
  }
  .menu_rigth .rice dt {
    flex: 0 0 57px;
  }
  .menu_rigth .rice dt img{
    width: 57px;
    height: 57px;
  }
  .menu_rigth .addCar{
    position: absolute;
    top: 72px;
    right: 18px;
  }
  /* 右边menu菜单结束 */
</style>
