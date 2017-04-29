<template>
  <div class="themeDetail">
    <div class="model" :class="model">
      <v-header @showSide="show" :title="themeTitle"></v-header>
      <sidebar :sidebarShow="sidebarShow" @hideSidebar="hide" ref="sidebar"></sidebar>
      <div class="editors border-1px" @click="showEditors(id)">
        <span class="editor">主编</span>
        <div class="avatar" v-for="editor in this.$store.state.currentTheme.editors"><img :src="attachImageUrl(editor.avatar)" width="25" height="25"></div>
        <span class="arrow_right"><img src="./arrow_right.png" width="15" height="15"></span>
      </div>
      <div class="themeNewList" :class="model">
        <ul>
          <li v-for="story in this.$store.state.currentTheme.stories" :key="story.id" class="new border-1px" @click="goNew(story.id)">
            <span class="title">{{story.title}}</span>
            <span class="avatar" v-for="(item,index) in story.images" v-if="index<1"><img v-lazy="attachImageUrl(item)"></span>
          </li>
        </ul>
      </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../Header/Header.vue'
  import sidebar from '../Sidebar/Sidebar.vue'
  import axios from 'axios';
  import router from '../../router'

  export default {
    data() {
      return {
        sidebarShow:false,         //侧边栏显示状态
        id:''                        //当前主题id
      }
    },
    //观察路由跳转更新数据
    watch:{
      '$route'(to,from){
          this.fetchData();
      }
    },
    //生命周期创建数据观察
    created() {
      this.fetchData();
    },
    methods:{
      //获取当前主题页面数据
      fetchData() {
          if(this.$store.state.currentThemeId != -1) {
            axios.get('api/theme/' + this.$store.state.currentThemeId).then((response) => {
              let theme = response.data
              let stories = theme.stories;
              this.$store.dispatch('addTheme',theme)
              this.$store.dispatch('addAllNews',stories);
            }).catch((error) => {
              console.log(error)
            });
          }
          this.id = this.$store.state.currentThemeId;
      },
      //显示侧边栏，在其显示时访问他的获取数据方法，从而使better-scroll能够计算出中间主题列表高度
      show() {
        this.sidebarShow = true;
        if(this.sidebarShow){
          this.$refs.sidebar.fetchData();
        }
      },
      //隐藏侧边栏
      hide() {
        this.sidebarShow = false;
      },
      //对图片url进行转换
      attachImageUrl(srcUrl) {
         if(srcUrl !== undefined){
             return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
         }
      },
      //跳转主编列表路由
      showEditors(id) {
          router.push({ name:'editorsList',params:{id:id}})
      },
      //前往主题新闻详情页
      goNew(id) {
        this.$store.state.id = id;
        router.push({ name:'newDetail', params:{ id:id }});
        this.$store.dispatch('judgeCollectState');
        this.$store.dispatch('changeGoType',3)
      }
    },
    computed: {
      //获取当前主题id
      currentThemeId() {
        return this.$store.state.currentThemeId;
      },
      //获取当前主题标题
      themeTitle() {
         return this.$store.state.currentTheme.name
      },
      model() {
        return this.$store.getters.getModel
      }
    },
    //注册组件
    components:{
      'v-header':header,
      sidebar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/index.styl"

 .model
   &.morning
     color rgb(51,51,51)
     background-color rgb(255,255,255)
   &.night
     color rgb(184,184,184)
     background-color rgb(52,52,52)
   .editors
     position relative
     top 40px
     width 92%
     height 40px
     line-height 40px
     border-1px(rgba(7,17,27,0.1))
     padding 0 10px
     .editor
       font-size 17px
       color rgb(102,102,102)
     .avatar
       display inline-block
       img
         margin-left 10px
         border-radius 50%
     .arrow_right
       position absolute
       right 10px
       padding 0 10px

   .themeNewList
     position relative
     top 40px
     width 100%
     height 100%
     &.morning
       color rgb(51,51,51)
       background-color rgb(255,255,255)
     &.night
       color rgb(184,184,184)
       background-color rgb(52,52,52)
     .new
       display flex
       position relative
       left -15px
       padding 20px 0 20px 10px
       border-1px(rgba(7,17,27,0.1))
       .title
         flex 1
         margin-right 10px
         line-height 20px
       .avatar
         flex 0 0 70px
         width 70px
         height 55px
         img
           width 70px
           height 55px
           img[lazy=loading]
             height 55px
             width 70px
             margin auto
</style>
