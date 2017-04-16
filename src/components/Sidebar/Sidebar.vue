<template>
  <transition name="fold">
    <div class="sidebar" v-show="sidebarShow">
      <div class="user">
        <div class="avatar"></div>
        <div class="username">哈哈哈蜜瓜</div>
        <div class="back" @click="hide"><img src="./back.png" width="20" height="20"></div>
      </div>
      <div class="menu-list">
        <div class="menu"  v-for="(item,index) in menu" v-if="index<3">
          <div class="avatar"><img :src="item.avatar" width="20" height="20"></div>
          <div class="name">{{item.name}}</div>
        </div>
      </div>
      <div class="theme-list" ref="themeWrapper">
        <ul>
          <li class="theme" v-for="item in data" @click="goTheme(item.id)" :class="{'current':currentThemeId===item.id}">
            <div class="icon" v-if="item.id == -1"><img src="./home.png" width="20" height="20"></div>
            <div class="content">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <<div class="bottom-menu">
        <div class="menu"  v-for="(item,index) in menu" v-if="index>2">
          <div class="avatar"><img :src="item.avatar" width="20" height="20"></div>
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import router from '../../router/index';

  export default {
    props:{
        sidebarShow:{
            type:Boolean
        },
        currentIndex:{
            type:Number,
            default:-1
        }
    },
    data() {
      return {
          data:[],
      }
    },
    created() {
      this.fetchData();
      this.menu = [
        {
          name:'收藏',
          avatar:require('./collect.png')
        },{
          name:'消息',
          avatar:require('./news.png')
        },{
          name:'设置',
          avatar:require('./set.png')
        },{
          name:'离线',
          avatar:require('./offline.png')
        },{
          name:'夜间',
          avatar:require('./nightoff.png')
        }
      ]
    },
    methods:{
        hide() {
          this.$emit('hideSidebar');
        },
        fetchData() {
            axios.get('api/themes').then((response) => {
                this.data = response.data.others;

                this.data.unshift({
                  color: 0,
                  thumbnail: '',
                  description: '首页',
                  id: -1,
                  name: '首页'
                });

                this.$nextTick(() => {
                  this.themeScroll = new BScroll(this.$refs.themeWrapper,{
                    click:true
                  });
                });
            }).catch((error) => {
                console.log('error');
            })
        },
        goTheme(id) {
            if(id == -1) {
              this.hide();
              router.push({name: 'homePage'});
              this.$store.dispatch('changeCurrentThemeId',id);
            }else if(id == this.$route.params.id){
                this.hide();
            }else {
              this.$store.dispatch('changeCurrentThemeId',id);
              router.push({ name: 'themeDetail', params: { id: id } });
              console.log(this.$store.state.currentThemeId)
            }
        }
    },
    computed: {
        currentThemeId() {
            return this.$store.state.currentThemeId;
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .sidebar
    position absolute
    top 0
    left 0
    z-index 2
    height 100%
    width 230px
    background-color rgb(35,42,48)
    transform translate3d(0,0,0)
    &.fold-enter-active,&.fold-leave-active
      transition all 0.5s
    &.fold-enter,&.fold-leave-active
      transform translate3d(-100%,0,0)
    .user
      padding 10px 10px 0
      font-size 0
      .avatar
        display inline-block
        margin-right 10px
        width 40px
        height 40px
        bg-image('useravatar')
        background-size 40px 40px
        background-repeat no-repeat
        border-radius 50%
        vertical-align top
      .username
        display inline-block
        font-size 15px
        color rgb(148,153,157)
        line-height 40px
      .back
        display inline-block
        vertical-align top
        position relative
        top 10px
        left 60px
    .menu-list
      display flex
      padding 10px 20px 10px 10px
      .menu
        flex 1
        text-align center
        .avatar
          margin-bottom 5px
        .name
          color rgb(148,153,157)
    .theme-list
      position absolute
      top 114px
      bottom 56px
      width 100%
      overflow hidden
      .theme
        padding-left 15px
        color rgb(148,153,157)
        &.current
          background-color rgb(27,35,41)
          color rgb(255,255,255)
        .icon
          display inline-block
          margin-right 5px
        .content
          display inline-block
          line-height 50px

    .bottom-menu
      position absolute
      display flex
      bottom 0
      left 0
      width 100%
      height 56px
      .menu
        flex 1
        text-align center
        padding-top 5px
        .avatar
          margin-bottom 5px
        .name
          color rgb(148,153,157)
</style>
