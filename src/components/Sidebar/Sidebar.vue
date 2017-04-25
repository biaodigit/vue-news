<template>
  <div>
    <transition name="fold">
      <div class="sidebar"  v-show="sidebarShow">
        <div class="user">
        <div class="avatar"></div>
        <div class="username">哈哈哈蜜瓜</div>
        <div class="back" @click="hide"><img src="./back.png" width="20" height="20"></div>
      </div>
        <div class="menu-list">
          <div class="menu" @click="goCollect">
            <div class="avatar"><img src="./collect.png" width="20" height="20"></div>
            <div class="name">收藏</div>
          </div>
          <div class="menu">
            <div class="avatar"><img src="./news.png" width="20" height="20"></div>
            <div class="name">消息</div>
          </div>
          <div class="menu">
            <div class="avatar"><img src="./set.png" width="20" height="20"></div>
            <div class="name">设置</div>
          </div>
      </div>
        <div class="themes-list" ref="themeWrapper">
        <ul style="padding-left: 0">
          <li class="themes" v-for="item in data" @click="goTheme(item.id)" :class="{'current':currentThemeId===item.id}">
            <div class="icons" v-if="item.id == -1"><img src="./home.png" width="20" height="20"></div>
            <div class="themetitle">{{item.name}}</div>
          </li>
        </ul>
      </div>
        <div class="bottom-menu">
          <div class="menu">
            <div class="avatar"><img src="./set.png" width="20" height="20"></div>
            <div class="name">离线</div>
          </div>
          <div class="menu">
            <div class="avatar"><img src="./nightoff.png" width="20" height="20"></div>
            <div class="name">夜间</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask"  @click.stop.prevent="hide"  v-show="sidebarShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import router from '../../router/index';
  import collect from '../Collect/Collect.vue'

  export default {
    //接收父组件传值
    props:{
      sidebarShow:{
        type:Boolean
      },
      currentIndex:{
        type:Number,
        default:-1                    //当前高亮主题默认id
      }
    },
    data() {
      return {
        data:[]                        //初始化主题列表数据
      }
    },
    //生命周期创建观察数据
    created() {
      this.fetchData();
    },
    //观察路由跳转更新数据
    watch:{
      '$route'(to,form){
        this.fetchData();
      }
    },
    methods:{
      //隐藏侧边栏，向上派发事件
      hide() {
        this.$emit('hideSidebar');
      },
      //获取主题列表数据
      fetchData() {
        axios.get('api/themes').then((response) => {
          this.data = response.data.others;

          //由于改api中没有首页的数据，因此在data中添加首页
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
      //跳转收藏页面路由
      goCollect() {
        router.push({ name:'collect' })
      },
      //跳转主题页面路由
      goTheme(id) {
        if(id == -1) {
          this.hide();
          router.push({name: 'homePage'});
          this.$store.dispatch('changeGoType',1)
          this.$store.dispatch('changeCurrentThemeId',id);
        }else if(id == this.$route.params.id){
          this.hide();
        }else {
          this.hide();
          this.$store.dispatch('changeCurrentThemeId',id);
          router.push({ name: 'themeDetail', params: { id: id } });
        }
      }
    },
    computed: {
      //计算当前主题id
      currentThemeId() {
        return this.$store.state.currentThemeId;
      }
    },
    //注册组件
    components:{
      collect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .sidebar
    position fixed
    top 0
    left 0
    z-index 50
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
    .themes-list
      position absolute
      top 114px
      bottom 56px
      width 100%
      overflow hidden
      .themes
        display table
        width 100%
        padding-left 15px
        color rgb(148,153,157)
        &.current
          background-color rgb(27,35,41)
          color rgb(255,255,255)
        .icons
          display inline-block
          margin-right 5px
        .themetitle
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
  .mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background: rgba(7, 17, 27, 0.6)
    opacity 1
    &.fade-enter-active,&.fade-leave-active
      transition all 0.5s
    &.fade-enter,&.fade-leave-active
      opacity 0
</style>
