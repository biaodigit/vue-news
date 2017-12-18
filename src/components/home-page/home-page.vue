<template>
  <div class="homepage" ref="homepage">
    <v-header @showSide="show"></v-header>
    <sidebar ref="sidebar"></sidebar>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :topDistance="topDistance"
                 :bottomDistance="bottomDistance"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange" ref="loadmore">
      <swipe></swipe>
      <home-page-detail @hideSidebar="hide" ref="homePageDetail"></home-page-detail>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus != 'loading'">下拉刷新</span>
        <span v-show="topStatus == 'loading'">刷新中...</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus != 'loading'">上拉加载</span>
        <span v-show="bottomStatus == 'loading'">加载中...</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header.vue'
  import Sidebar from 'components/sidebar/sidebar.vue'
  import swipe from 'components/swipe/swipe.vue'
  import HomePageDetail from 'components/home-page-detail/home-page-detail'
  import axios from 'axios'

  export default {
    data() {
      return {
        data: [],                               //初始化首页新闻数据
        topDistance: 50,                       //下拉刷新最小距离
        bottomDistance: 70,                    //上拉加载最小距离
        bottomStatus: '',                      //底部状态
        topStatus: '',                           //顶部状态
        scroll: ''
      }
    },
    methods: {
      //获取底部更新状态
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      //获取顶部更新状态
      handleTopChange(status) {
        this.topStatus = status;
      },
      //下拉刷新，触发向子组件派发方法
      loadTop() {
        this.$refs.homePageDetail.$emit('refresh')
        this.$refs.loadmore.onTopLoaded()
      },
      //上拉加载，触发向子组件派发方法
      loadBottom() {
        this.$refs.homePageDetail.$emit('loadMore')
        this.$refs.loadmore.onBottomLoaded()
      },
      //显示侧边栏，在其显示时访问他的获取数据方法，从而使better-scroll能够计算出中间主题列表高度
      show() {
        console.log(1)
        this.$refs.sidebar.open()
      },
      //隐藏侧边栏
      hide() {
        this.sidebarShow = false;
        document.body.className = ""
        document.scrollingElement.scrollTop = this.scroll
      }
    },
    //注册组件
    components: {
      VHeader,
      Sidebar,
      swipe,
      HomePageDetail
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mint-loadmore-top
    position relative
    top 40px

  .mint-loadmore-bottom
    position relative
    top 30px

  .modal-open
    position: fixed
    width: 100%
</style>
