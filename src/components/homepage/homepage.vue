<template>
  <div class="homepage">
    <v-header @showSide="show"></v-header>
    <sidebar :sidebarShow="sidebarShow" @hideSidebar="hide" ref="sidebar"></sidebar>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :topDistance="topDistance" :bottomDistance="bottomDistance"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange" ref="loadmore">
      <swipe></swipe>
      <homepageDetail @hideSidebar="hide" ref="newList"></homepageDetail>
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
  import header from '../Header/Header.vue'
  import sidebar from '../Sidebar/Sidebar.vue'
  import swipe from  '../Swipe/Swipe.vue'
  import homepageDetail from '../HomePageDetail/HomePageDetail.vue'
  import axios from 'axios'

  export default {
      data() {
        return {
          sidebarShow:false,
          data:[],
          topDistance:50,
          bottomDistance:70,
          bottomStatus:'',
          topStatus:''
        }
      },
      methods:{
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        loadTop() {
          this.$refs.newList.$emit('refresh')
          this.$refs.loadmore.onTopLoaded()
        },
        loadBottom() {
          this.$refs.newList.$emit('loadMore')
          this.$refs.loadmore.onBottomLoaded()
        },
        show() {
          this.sidebarShow = true;
          if(this.sidebarShow){
              this.$nextTick(() => {
                  this.$refs.sidebar.fetchData();
              })
          }
        },
        hide() {
          this.sidebarShow = false;
        }
      },
      components:{
        'v-header':header,
        sidebar,swipe,homepageDetail
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
</style>
