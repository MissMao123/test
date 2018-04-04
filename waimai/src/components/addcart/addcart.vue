<template>
  <div class="addBox">
    <transition name="move">
      <span class="reduceNum" @click="reduce" v-show="foods.num >0"></span>
    </transition>
    <span class="count" v-show="foods.num >0">{{foods.num}}</span>
    <span class="addNum" @click="add"></span>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props:{
    foods:{
      type:Object
    }
  },
  methods:{
    add(){
      if(!this.foods.num){
        Vue.set(this.foods,'num',1)
      }else{
        this.foods.num ++
      }
    },
    reduce(){
      if(this.foods.num){
        this.foods.num --
      }
    }
  }
}
</script>

<style lang="less">
  .addBox{
    display: flex;
    flex-direction: row;
  }
  .addBox span{
    display:block;
    width: 22px;
    height: 22px;
  }
  .addBox .count{
    background: 0;
    border: 0;
    width: 24px;
    height: 24px;
    color: rgb(147,153,159);
    line-height: 24px;
    text-align: center;
  }
  .addBox .reduceNum{
    background: url('reduce.png')center center no-repeat;
    transition: all 1s;
    &.move-enter-active,&.move-leave-active{
      transition: all 1s;
    }
    &.move-enter,&.move-leave-active{
      transition: all 1s;
      opacity: 0;
    }
  }
  .addBox .addNum{
    background: url('add.png')center center no-repeat;
  }
</style>
