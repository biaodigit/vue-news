<template>
  <div class="comments">
    <sonheader @back="back" :title="title"></sonheader>
    <div class="commentsArea">
      <div class="longComments">
        <div class="longCommentsTitle border-1px" @click="showLongComment">{{this.$store.state.long_comments}}条长评<img class="thumb" :src="longThumb"></div>
        <div class="longComment border-1px" v-for="item in longcomments" v-show="longCommentShow">
          <span class="avatar"><img :src="attachImageUrl(item.avatar)" width="30" height="30"></span>
          <div class="content">
            <span class="name">{{item.author}}</span>
            <span class="likes"><img src="./thumbup.png" width="20" height="20">{{item.likes}}</span><br>
            <span class="comment">{{item.content}}</span>
          </div>
        </div>
      </div>
      <div class="shortComments">
        <div class="shortCommentsTitle border-1px" @click="showShortComment">{{this.$store.state.short_comments}}条短评<img class="thumb" :src="shortThumb"></div>
        <div class="shortComment border-1px" v-for="item in shortcomments" v-show="shortCommentShow">
          <span class="avatar"><img :src="attachImageUrl(item.avatar)" width="30" height="30"></span>
          <div class="content">
            <span class="name">{{item.author}}</span>
            <span class="likes"><img src="./thumbup.png" width="20" height="20">{{item.likes}}</span><br>
            <span class="comment">{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="bottomMenu"></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router'
  import axios from 'axios'
  import sonheader from '../SonHeader/SonHeader.vue'

  export default {
    data() {
        return {
           longcomments:{},
           shortcomments:{},
           longCommentShow:true,
           shortCommentShow:false,
           title:''
        }
    },
    created() {
        this.fetchLongData(),
        this.fetchShortData()
    },
    watch:{
      '$route'(to,from){
          this.fetchLongData(),
          this.fetchShortData()
      }
    },
    methods:{
       fetchLongData() {
         axios.get('api/story/'+ this.$store.state.id + '/long-comments').then((response) => {
             this.longcomments = response.data.comments;
         });

         this.title = this.$store.state.comments + '条评论'
       },
      fetchShortData() {
        axios.get('api/story/'+ this.$store.state.id + '/short-comments').then((response) => {
          this.shortcomments = response.data.comments;
        })
      },
       back() {
         router.go(-1)
       },
       attachImageUrl(srcUrl) {
           if(srcUrl !== undefined){
              return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
           }
       },
       showLongComment() {
          this.longCommentShow = !this.longCommentShow;
       },
      showShortComment() {
          this.shortCommentShow = !this.shortCommentShow;
      },
    },
    computed:{
        longThumb() {
           if(this.longCommentShow){
               return require('./down.png')
           }else{
               return require('./up.png')
           }
        },
        shortThumb() {
          if(this.shortCommentShow){
            return require('./down.png')
          }else{
            return require('./up.png')
          }
        },
    },
    components:{
        sonheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

   .comments
     width 100%
     height 100%
     .commentsArea
       position absolute
       top 40px
       bottom 30px
       width 99%
       .longComments,.shortComments
         width 100%
         .longCommentsTitle,.shortCommentsTitle
           height 40px
           line-height 40px
           padding-left 10px
           font-weight 700
           color rgb(7,17,27)
           border-1px(rgba(7,17,27,0.1))
           .thumb
              position absolute
              top 8px
              right 10px
              width 20px
              height 20px
         .longComment,.shortComment
           display flex
           width 94%
           padding 10px 10px 0  10px
           border-1px(rgba(7,17,27,0.1))
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
             top:-10px
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
