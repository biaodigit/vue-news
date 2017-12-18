import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/home-page/home-page'
import ThemeDetail from 'components/theme-detail/theme-detail'
import NewDetail from 'components/new-detail/new-detail'
import Collect from 'components/collect/collect'
import Comments from 'components/comments/comments'
import EditorsList from 'components/editors-list/editors-list'
import Editor from 'components/editor/editor'

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
    },
    {
      path:'/comments/:id',
      name:'comments',
      component:Comments
    },
    {
      path:'/editorsList/:id',
      name:'editorsList',
      component:EditorsList
    },
    {
      path:'/editor/:id',
      name:'editor',
      component:Editor
    }
  ],
  linkActiveClass:'active'
})
