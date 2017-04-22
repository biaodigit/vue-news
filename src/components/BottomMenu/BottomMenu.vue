<template>
  <div class="bottomMenu">
    <div class="menu" @click="goBack"><img src="./back.png" width="25" height="25"></div>
    <div class="menu"><img src="./next.png" width="25" height="25"></div>
    <div class="menu" @click="thumbUp"><img :src="thumbs" width="25" height="25"><span class="extra">{{this.$store.state.popularity}}</span></div>
    <div class="menu" @click="showShare"><img src="./share.png" width="25" height="25"></div>
    <div class="menu" @click="goComments(newId)"><img src="./common.png" width="25" height="25"><span class="extra" v-if="this.$store.state.comments != 0">{{this.$store.state.comments}}</span></div>
    <transition name="fold">
      <div class="share" v-show="shareshow">
        <div class="title">分享这篇内容</div>
        <div class="shareMenus">
          <mt-swipe :auto="0" style="height: 225px;">
            <mt-swipe-item>
              <div class="shareMenu" v-for="(item,index) in data" v-if="index<8">
                <span class="avatar"><img :src="item.avatar"></span>
                <span class="name">{{item.name}}</span>
              </div>
            </mt-swipe-item>
            <mt-swipe-item>
              <div class="shareMenu" v-for="(item,index) in data" v-if="index>7">
                <span class="avatar"><img :src="item.avatar"></span>
                <span class="name">{{item.name}}</span>
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
        thumb:false,
        shareshow:false,
        collect:false,
      }
    },
    watch:{
      '$route'(to,from){
          this.fetchExtraData();
      }
    },
    created() {
      this.fetchExtraData();
      this.data = [
        {
          name:'微信好友',
          avatar:require('./weixin.png')
        },
        {
          name:'微信朋友圈',
          avatar:require('./pengyouquan.png')
        },
        {
          name:'QQ',
          avatar:require('./qq.png')
        },
        {
          name:'新浪微博',
          avatar:require('./weibo.png')
        },
        {
          name:'复制链接',
          avatar:require('./copy.png')
        },
        {
          name:'有道云笔记',
          avatar:require('./biji.png')
        },
        {
          name:'印象笔记',
          avatar:require('./yinxiang.png')
        },
        {
          name:'腾讯微博',
          avatar:require('./tencent.png')
        },
        {
          name:'信息',
          avatar:require('./new.png')
        },
        {
          name:'Instapaper',
          avatar:require('./instapaper.png')
        }
      ]
    },
    methods:{
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
      goBack() {
        if(this.$store.state.goType == 1){
            router.push({ name:'homePage'})
        }else if(this.$store.state.goType == 2){
           router.push({ name:'collect'})
        };
        console.log(this.$store.state.goType);
      },
      thumbUp() {
        this.thumb = !this.thumb;
        if(this.thumb){
            this.$store.state.popularity++;
        }else{
            this.$store.state.popularity--;
        }
      },
      showShare() {
        this.shareshow = !this.shareshow
      },
      hideShare() {
        this.shareshow = !this.shareshow
      },
      changeCollect(){
        this.$store.dispatch('changeCollectState')
      },
      goComments(id){
          router.push({ name:'comments',params:{id:id}})
      }
    },
    computed:{
       thumbs() {
           if(this.thumb){
              return require('./thumbups.png');
           }else{
              return require('./thumbup.png');
           }
       },
       newId(){
         return this.$store.state.id;
       }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .bottomMenu
    position fixed
    display flex
    bottom 0
    height 44px
    width 100%
    background-color rgb(255,255,255)
    border-top 1px solid #f5f5f5
    .menu
      flex 1
      line-height 44px
      font-size 30px
      text-align center
      color rgba(7,17,27,0.3)
      margin -bottom 5px
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
        width 100%
        .shareMenu
          display inline-block
          padding-top 15px
          z-index 50
          width 25%
          text-align center
          .avatar
            margin 0 5px 15px 0
          .name
            position relative
            top 7px
            text-align center
            margin-left 6px

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
