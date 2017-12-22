<template>
  <div class="comments">
    <son-header @back="back" :title="title"></son-header>
    <div class="commentsArea" :class="model">
      <div class="longComments" :class="model">
        <div class="longCommentsTitle border-1px" @click="showLongComment">{{this.$store.state.long_comments}}条长评<img
          class="thumb" :src="longThumb"></div>
        <div class="longComment border-1px" v-for="item in longComments" v-show="longCommentShow">
          <span class="avatar"><img :src="attachImageUrl(item.avatar)" width="30" height="30"></span>
          <div class="content">
            <span class="name">{{item.author}}</span>
            <span class="likes"><img src="./thumbup.png" width="20" height="20">{{item.likes}}</span><br>
            <span class="comment">{{item.content}}</span>
          </div>
        </div>
      </div>
      <div class="shortComments" :class="model">
        <div class="shortCommentsTitle border-1px" @click="showShortComment">{{this.$store.state.short_comments}}条短评<img
          class="thumb" :src="shortThumb"></div>
        <div class="shortComment border-1px" v-for="item in shortComments" v-show="shortCommentShow">
          <span class="avatar"><img :src="attachImageUrl(item.avatar)" width="30" height="30"></span>
          <div class="content">
            <span class="name">{{item.author}}</span>
            <span class="likes"><img src="./thumbup.png" width="20" height="20">{{item.likes}}</span><br>
            <span class="comment">{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router'
  import axios from 'axios'
  import SonHeader from '../son-header/son-header'

  export default {
    data() {
      return {
        longComments: {},                         //初始化长评论
        shortComments: {},                        //初始化短评论
        longCommentShow: true,                   //初始长评论显示状态
        shortCommentShow: false,                 //初始短评论显示状态
        title: ''                                  //初始化头部标题
      }
    },
    //生命周期建立数据观察
    created() {
      this.fetchLongData();
      this.fetchShortData();
    },
    //观察路由跳转更新数据
    watch: {
      '$route'(to, from){
        this.fetchLongData();
        this.fetchShortData();
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      //获取长评论数据
      fetchLongData() {
        axios.get('api/story/' + this.$store.state.id + '/long-comments').then((response) => {
          this.longComments = response.data.comments;
        })

        this.title = this.$store.state.comments + '条评论'
      },
      //获取短评论数据
      fetchShortData() {
        axios.get('api/story/' + this.$store.state.id + '/short-comments').then((response) => {
          this.shortComments = response.data.comments;
        })
      },
      //返回上一级路由
      back() {
        router.go(-1)
      },
      //对图片url进行转化
      attachImageUrl(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
        }
      },
      //是否显示长评论
      showLongComment() {
        this.longCommentShow = !this.longCommentShow;
      },
      //是否显示短评论
      showShortComment() {
        this.shortCommentShow = !this.shortCommentShow;
      },
    },
    computed: {
      //计算长评论是否显示
      longThumb() {
        if (this.longCommentShow) {
          return require('./down.png')
        } else {
          return require('./up.png')
        }
      },
      //计算短评论是否显示
      shortThumb() {
        if (this.shortCommentShow) {
          return require('./down.png')
        } else {
          return require('./up.png')
        }
      },
      //返回当前模式
      model() {
        return this.$store.getters.getModel
      }
    },
    //注册组件
    components: {
      SonHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .comments
    width 100%
    height 100%
    .commentsArea
      position absolute
      top 40px
      height 100%
      width 100%
      &.morning
        background-color rgb(255, 255, 255)
      &.night
        background-color rgb(85, 85, 85)
      .longComments, .shortComments
        width 100%
        &.morning
          color rgb(51, 51, 51)
          background-color rgb(255, 255, 255)
        &.night
          color rgb(184, 184, 184)
          background-color rgb(85, 85, 85)
        .longCommentsTitle, .shortCommentsTitle
          height 40px
          line-height 40px
          padding-left 10px
          font-weight 700
          color rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
          .thumb
            position absolute
            top 8px
            right 10px
            width 20px
            height 20px
        .longComment, .shortComment
          display flex
          width 94%
          padding 10px 10px 0 10px
          border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            flex 0 0 30px
            width 30px
            height 30px
            img
              border-radius 50%
          .content
            flex 1
            position relative
            margin-left 10px
            top: -10px
            .name
              left 5px
              line-height 30px
            .likes
              position absolute
              width 20px
              height 20px
              right 5px
              img
                position absolute
                right 20px
                top -25px
            .comment
              font-size 18px
</style>
