<template lang="html">
  <div class="star" :class="starSize">
    <span v-for="item in starsArr" :class="item"></span>
  </div>
</template>
<script>
  export default{
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    name:"star",
    computed:{
      starSize:function() {
        return "star-"+this.size
      },
      starsArr:function(){
        let result = [];
        let integer = Math.floor(this.score);
        let decimal = this.score - integer
        for(var i=0; i<integer;i++){
          result.push("on")
        }
        if(decimal>=0.5){
          result.push("half");
        }
        while (result.length<5) {
          result.push("off")
        }
        return result;
      }
    }
  }
</script>
<style lang="css">
  .star{
    display: flex;
    /* justify-content: center; */
  }
  .star.star-48{
    justify-content: center;
  }
  .star-48 span{
    width: 24px;
    margin-right: 20px;
    height: 24px;
    background-size: 24px 24px;
  }
  .star-48 .on{
    background-image: url('./star48_on@2x.png');
  }
  .star-48 .half{
    background-image: url('./star48_half@2x.png');
  }
  .star-48 .off{
    background-image: url('./star48_off@2x.png');
  }
  .star-36 span{
    width: 18px;
    margin-right: 4px;
    height: 18px;
    background-size: 18px 18px;
  }
  .star-36 .on{
    background-image: url('./star36_on@2x.png');
  }
  .star-36 .half{
    background-image: url('./star36_half@2x.png');
  }
  .star-36 .off{
    background-image: url('./star36_off@2x.png');
  }
  .star-24 span{
    width: 12px;
    margin-right: 4px;
    height: 12px;
    background-size: 12px 12px;
  }
  .star-24 span:last-child{
    margin-right: 0;
  }
  .star-24 .on{
    background-image: url('./star24_on@2x.png');
  }
  .star-24 .half{
    background-image: url('./star24_half@2x.png');
  }
  .star-24 .off{
    background-image: url('./star24_off@2x.png');
  }
</style>
