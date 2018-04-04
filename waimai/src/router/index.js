import Vue from 'vue'
import app from '../App'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import comment from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path:"/goods",
      name:"goods",
      component:goods
    },
    {
      path:"/ratings",
      name:"ratings",
      component:comment
    },
    {
      path:"/seller",
      name:"seller",
      component:seller
    }
  ]
})
