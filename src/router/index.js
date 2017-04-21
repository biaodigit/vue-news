import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage/HomePage'
import ThemeDetail from '@/components/ThemeDetail/ThemeDetail'
import NewDetail from '@/components/NewDetail/NewDetail'
import Collect from '@/components/Collect/Collect'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path:'/themeDetail/:id',
      name:'themeDetail',
      component:ThemeDetail
    },
    {
      path:'/newDetail/:id',
      name:'newDetail',
      component:NewDetail
    },
    {
      path:'/collect',
      name:'collect',
      component:Collect
    }
  ],
  linkActiveClass:'active'
})
