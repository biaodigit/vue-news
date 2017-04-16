import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage/HomePage'
import ThemeDetail from '@/components/ThemeDetail/ThemeDetail'

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
    }
  ],
  linkActiveClass:'active'
})
