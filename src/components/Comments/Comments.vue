<template>
  <div class="comments">
    <div class="commentsHeader"><span class="back" @click="back "><img src="./back.png" width="20" height="20"></span><h3>{{this.$store.state.comments}}条评论</h3></div>
    <div class="longComments"></div>
    <div class="shortComments"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router'

  export default {
    methods:{
       back() {
         router.go(-1)
       }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
   .comments
     width 100%
     height 100%
     .commentsHeader
       position fixed
       width 100%
       height 40px
       text-align center
       z-index 50
       line-height 40px
       background rgb(2,143,214)
       & > h3
         font-size 20px
         color white
       .back
         position absolute
         left 10px
         bottom 2px
</style>
