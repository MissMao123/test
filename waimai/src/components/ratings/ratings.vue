<template lang="html">
  <!-- 综合评价 -->
  <div class="ratings" ref="commentList">
    <div class="ratingsScroll">
      <dl class="assessHead">
        <dt>
          <h2>{{seller.serviceScore}}</h2>
          <p class="score">综合评分</p>
          <p class="contentH">高于周边商家{{seller.rankRate}}%</p>
        </dt>
        <span class="line"></span>
        <dd>
          <p>
            <span class="server">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="scoreS">{{seller.serviceScore}}</span>
          </p>
          <p>
            <span class="server">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="scoreS">{{seller.serviceScore}}</span>
          </p>
          <p>
            <span class="time">送达时间</span>
            <span class="mimute">{{seller.deliveryTime}}分钟</span>
          </p>
        </dd>
      </dl>
      <!-- 空白 -->
      <div class="blank">

      </div>
      <!-- 评论筛选 -->
        <div class="comment">
          <div class="commandBtn">
            <p @click="showAll">全部 {{this.ratings.length}}</p>
            <p @click="showGood">满意{{goodNum.length}}</p>
            <p @click="showHate">不满意{{hateNum.length}}</p>
          </div>
          <div class="choose">
            <span class="showChoose" @click="changeClass" :class="{'on':isOn,'off':!isOn}"></span>
            <p>只看有内容的评价</p>
          </div>
        </div>
      <!-- 评论筛选结束 -->
      <!-- 用户 -->
        <div class="user" >
          <dl class="userComment" v-for="(item1,index) in ratings" v-show="istext(item1)">
            <dt>
              <img :src="item1.avatar" alt="">
            </dt>
            <dd>
              <p class="name"><span> {{item1.username}}</span> <span> {{item1.rateTime/1000 | moment}}</span></p>
              <div class="p2">
                <star :size="24" :score="item1.score"></star>
                <p>{{item1.deliveryTime}}分钟送达</p>
              </div>
              <p class="p3">{{item1.text}}</p>
              <div class="all">
                <!-- <span :class="addClass"></span> -->
                <span class="great" :class="classArr[item1.rateType]"></span>
                <p class="p4" v-for="(item2,index) in item1.recommend">
                  <span>{{item2}}</span>
                </p>
              </div>
            </dd>
          </dl>
        </div>
      <!-- 用户结束 -->
    </div>
  </div>
</template>
<script>
  import bs from 'better-scroll'
  import star from '@/components/star/star'
  export default{
    name:"ratings",
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return {
        ratings:[],
        classArr:[],
        isOn:false,
        good:[],
        hate:[],
        isShow:false,
        isGood:false,
        isHate:false
      }
    },
    components:{
      'star':star,
    },
    created:function () {
      var _this = this
      this.$http.get('/api/ratings').then(function(response){
        if(response.data.err == 0){
          _this.ratings = response.data.data
        }
      })
      this.classArr = ['no','yes']
      this.$nextTick(() => {
        this.initScroll();
      })

    },
    methods:{
      initScroll(){
        this.commentList = new bs(this.$refs.commentList, {
          click: true,
        })
      },
      changeClass(){
        this.isOn =!this.isOn
        this.isShow =  false
        this.isGood =  false
        this.isHate =  false
      },
      istext(obj){
        if(this.isOn == true){
            return obj.text.length > 0
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
        this.isOn=false
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
      goodNum(){
        for (let i = 0; i< this.ratings.length; i++){
          if(this.ratings[i].rateType == 1){
            this.good.push(this.ratings[i])
          }
        }
        return this.good
      },
      hateNum(){
        for (let i = 0; i< this.ratings.length; i++){
          if(this.ratings[i].rateType == 0){
            this.hate.push(this.ratings[i])
          }
        }
        return this.hate
      }
    }
  }
</script>
<style>
  .ratings{
    position: absolute;
    top:175px;
    bottom: 48px;
    overflow: hidden;
    width: 100%;
  }
  .ratings .assessHead{
    width: 100%;
    display: flex;
    padding: 18px 24px;
    box-sizing: border-box;
    align-items: center;
  }
  .ratings .assessHead .line{
    display: block;
    width: 1px;
    margin-right: 24px;
    height: 87px;
    background: #e6e7e8;
  }
  .ratings .assessHead dt{
    text-align: center;
    width: 118px;
  }
  .ratings .assessHead dt h2{
    font-size: 24px;
    color: #ff9900;
    line-height: 18px;
    font-weight: 200;
  }
  .ratings .assessHead dt .score{
    font-size: 12px;
    color: rgb(7,17,27);
    margin-top: 12px;
    margin-bottom: 12px;
    line-height: 10px;
  }
  .ratings dd{
    flex: 1;
  }
  .assessHead dd p{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .assessHead dd p:nth-child(2){
    margin: 8px 0;
  }
  .assessHead dd p span:nth-child(1){
    font-size: 12px;
    color: rgb(7,17,27);
  }
  .assessHead dd p .server{
    margin-right: 6px;
  }
  .assessHead dd p .time{
    margin-right: 6px;
  }
  .assessHead dd p .scoreS{
    font-size: 12px;
    color: rgb(255,153,0);
  }
  .assessHead dd p .mimute{
    font-size: 12px;
    color: rgb(147,153,159);
  }
  .blank{
    width: 100%;
    height: 18px;
    background: #f3f5f7;
    border-top: 2px solid #e6e7e8;
    border-bottom: 2px solid #e6e7e8;
  }
  /* 评论筛选 */
  .comment{
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
    border-bottom: 2px solid #e6e7e8;
  }
  .comment .commandBtn{
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .comment .commandBtn p{
    padding: 10px 12px;
    box-sizing: border-box;
    font-size: 14px;
    margin-right: 8px;
    border-radius: 2px;
  }
  .comment .commandBtn p:nth-child(1){
    background: #00a0dc;
  }
  .comment .commandBtn p:nth-child(2){
    background: rgba(0, 160, 220, 0.2);
  }
  .comment .commandBtn p:nth-child(3){
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
  /* 评论筛选结束 */
  /* 用户评论 */
  .user{
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
  }
  .user dl{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 18px 0;
    border-bottom: 1px solid #e6e7e8;
  }
  .user dl dt{
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    margin-right: 12px;
  }
  .user dl dt img{
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }
  .user dl dd{
    flex: 1;
  }
  .user dl dd .name{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    color: rgb(7,17,27);
    line-height: 12px;
  }
  .user dl dd .name span:last-child{
    color: rgb(147,153,159);
  }
  .user dl dd .p2{
    display: flex;
    flex-direction: row;
    margin: 4px 0 6px 0;
    align-items: center;
  }
  .user dl dd .p2 .star{
    margin-right: 6px;
  }
  .user dl dd .p3{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
  }
  .user dl dd .all{
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .user dl dd .all .great{
    display: block;
    width: 14px;
    height: 14px;
    background-size: 12px;
    margin-right: 8px;
  }
  .user dl dd .all .great.yes{
    background: url('yes.png')center center no-repeat;
  }
  .user dl dd .all .great.no{
    background: url('no.png')center center no-repeat;
  }
  .user dl dd .all .p4 span{
    display: block;
    padding: 0 6px;
    box-sizing: border-box;
    line-height: 16px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    height: 16px;
    overflow: hidden;
    margin-right: 8px;
    font-size: 9px;
    color: rgb(147,153,159);
    text-overflow: ellipsis;
  }
  .user dl dd .all .p4:last-child span{
    margin-right: 0;
  }
  /* .user{
    height: 700px;
    overflow: hidden;
  } */
</style>
