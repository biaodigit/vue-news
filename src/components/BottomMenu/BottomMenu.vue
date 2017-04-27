<template>
  <div class="bottomMenu">
    <div class="menu" @click="goBack"><i class="icon iconfont icon-back"></i></div>
    <div class="menu" @click="goNext"><i class="icon iconfont icon-moreunfold"></i></div>
    <div class="menu" :class="{'isThumbUp':thumb}"  @click="thumbUp"><i class="icon iconfont icon-dianzan"></i><span class="extra">{{this.$store.state.popularity}}</span></div>
    <div class="menu" @click="showShare"><i class="icon iconfont icon-fenxiang"></i></div>
    <div class="menu" @click="goComments(newId)"><i class="icon iconfont icon-pinglun"></i><span class="extra" v-if="this.$store.state.comments != 0">{{this.$store.state.comments}}</span></div>
    <transition name="fold">
      <div class="share" v-show="shareshow">
        <div class="title">分享这篇内容</div>
        <div class="shareMenus">
          <mt-swipe :auto="0" style="height: 200px;">
            <mt-swipe-item>
              <div class="shareMenu">
                <i class="icon iconfont icon-weixinhaoyou"></i><br>
                <span class="name">微信好友</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-weixinpengyouquan"></i><br>
                <span class="name">微信朋友圈</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-QQ"></i><br>
                <span class="name">QQ</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-weibo"></i><br>
                <span class="name">新浪微博</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-fuzhi"></i><br>
                <span class="name">复制链接</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-youdaoyunbiji"></i><br>
                <span class="name">有道云笔记</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-yinxiangbiji"></i><br>
                <span class="name">印象笔记</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-tengxunweibo"></i><br>
                <span class="name">腾讯微博</span>
              </div>
            </mt-swipe-item>
            <mt-swipe-item>
              <div class="shareMenu">
                <i class="icon iconfont icon-xinxi"></i><br>
                <span class="name">信息</span>
              </div>
              <div class="shareMenu">
                <i class="icon iconfont icon-instapaper"></i><br>
                <span class="name">Instapaper</span>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="button" @click="changeCollect">{{this.$store.getters.getCollect}}</div>
        <div class="button" @click="hideShare">取消</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="shareshow" @click="hideShare"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router'
  import axios from  'axios'

  export default {
    data() {
      return {
        thumb:false,                         //点赞状态
        shareshow:false,                    //分享栏状态
      }
    },
    //生命周期创建进行数据观察
    created() {
      this.fetchExtraData();
    },
    //观察路由跳转数据更新
    watch:{
      '$route'(to,from){
        this.fetchExtraData();
      }
    },
    methods:{
      //获取新闻
      fetchExtraData() {
        let id = this.$store.state.id;
        axios.get('api/story-extra/' + this.$store.state.id).then(response => {
            let long_comments = response.data.long_comments;
            let popularity = response.data.popularity;
            let short_comments = response.data.short_comments;
            let comments = response.data.comments;

            this.$store.dispatch('changeStoryExtra',{
                long_comments:long_comments,
                short_comments:short_comments,
                comments:comments,
                popularity:popularity
            })
          }).catch(error => {
            console.log(error);
          });
      },
      //返回上一级路由，判断是从哪里进入
      goBack() {
        if(this.$store.state.goType == 1){
            router.push({ name:'homePage'})
        }else if(this.$store.state.goType == 2){
           router.push({ name:'collect'});
          this.$store.dispatch('changeGoType',1);
        }else if(this.$store.state.goType == 3){
            router.push({ name:'themeDetail',params:{id:this.$store.state.currentThemeId}});
        };
        console.log(this.$store.state.ids)
      },
      //点赞
      thumbUp() {
        this.thumb = !this.thumb;
        if(this.thumb){
            this.$store.state.popularity++;
        }else{
            this.$store.state.popularity--;
        }
      },
      //显示分享栏
      showShare() {
        this.shareshow = !this.shareshow
      },
      //隐藏分享栏
      hideShare() {
        this.shareshow = !this.shareshow
      },
      //改变收藏状态
      changeCollect(){
        this.$store.dispatch('changeCollectState')
      },
      //跳转评论路由页面
      goComments(id){
          router.push({ name:'comments',params:{id:id}})
      },
      //加载下一篇新闻
      goNext(){
        let id = this.$store.state.nextId;
        router.push({ name:'newDetail', params:{ id:id}});
        this.$store.dispatch('addNextId',id);
      }
    },
    computed:{
      //返回当前新闻详情页id
      newId(){
        return this.$store.state.id;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";
  @import "../../common/stylus/iconfont.css"

  .bottomMenu
    position fixed
    display flex
    bottom -1px
    height 44px
    width 100%
    background-color rgb(255,255,255)
    border-top 1px solid #f5f5f5
    .menu
      flex 1
      line-height 44px
      font-size 30px
      text-align center
      color rgba(7,17,27,0.4)
      margin-bottom 5px
      &.isThumbUp
        color deepskyblue
      .iconfont
        font-size 25px
      img
        position relative
        bottom 3px
      .extra
        position relative
        bottom 15px
        font-size 15px
        color rgba(7,17,27,0.4)
    .share
      position fixed
      bottom 0
      left 0
      width 100%
      height 380px
      background #f5f5f5
      z-index 50
      border-top 1px solid #f5f5f5
      transform translate3d(0,0,0)
      &.fold-enter-active,&.fold-leave-active
        transition all 0.5s
      &.fold-enter,&.fold-leave-active
        transform translate3d(0,100%,0)
      .title
        width 100%
        height 25px
        text-align center
        font-size 17px
        padding-top 10px
      .shareMenus
        position relative
        top 5px
        width 100%
        font-size 0
        .shareMenu
          display inline-block
          padding-top 15px
          z-index 50
          width 25%
          margin-bottom 30px
          text-align center
          i
            font-size 25px
            padding 10px
            border-radius 50%
            color #ffffff
            &.icon-weixinhaoyou
              background: #64c654
            &.icon-weixinpengyouquan
              background: #75cd37
            &.icon-QQ
              background: #286bc4
            &.icon-weibo
              background: #ec4226
            &.icon-fuzhi
              background: #dd472c
            &.icon-youdaoyunbiji
              background: #38a3ea
            &.icon-yinxiangbiji
              background: #5db346
            &.icon-tengxunweibo
              background: #3ea1d9
            &.icon-xinxi
              background: #4fe54e;
            &.icon-instapaper
              background: #6c6c6c;


          .name
            display block
            position relative
            top 20px
            font-size 18px
            text-align center


      .button
        position relative
        height 40px
        width 80%
        bottom 5px
        margin 15px auto
        background rgb(255,255,255)
        text-align center
        line-height 40px

    .mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background: rgba(7, 17, 27, 0.6)
      z-index 40
      opacity 1
      &.fade-enter-active,&.fade-leave-active
        transition all 0.5s
      &.fade-enter,&.fade-leave-active
        opacity 0
</style>
