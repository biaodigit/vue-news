<template>
  <div class="header">
    <span class="navigation" @click="showSidebar"></span><h2>{{title}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
        title:{
            type:String,
            default:'今日热闻'
        }
    },
    methods:{
        showSidebar() {
            this.$emit('showSide');
        },
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
   @import '../../common/stylus/mixin.styl'

  .header
    position fixed
    top 0
    left 0
    font-size 0
    width 100%
    height 40px
    z-index 1
    text-align center
    background-color rgb(2,143,214)
    & > h2
      line-height 40px
      font-size 22px
      color white
    .navigation
      position absolute
      top 10px
      width 20px
      height 20px
      left 10px
      padding 5px
      bg-image('navigation')
      background-size 20px 20px
      background-repeat no-repeat

</style>
