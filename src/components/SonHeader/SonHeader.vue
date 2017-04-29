<template>
  <div class="sonHeader">
    <div class="model" :class="model">
      <span class="back" @click="back "><i class="icon iconfont icon-back"></i></span><h3>{{title}}</h3>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //接收父组件传值
    props:{
      title:{
        type:String
      }
    },
    methods:{
      //向上触发返回事件
      back() {
        this.$emit('back')
      }
    },
    computed:{
      model() {
        return this.$store.getters.getModel
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/iconfont.css"

  .sonHeader
    position fixed
    width 100%
    height 40px
    text-align center
    z-index 50
    line-height 40px
    background rgb(2,143,214)
    .model
      &.morning
        color rgb(51,51,51)
        background-color rgb(2,143,214)
      &.night
        color rgb(184,184,184)
        background-color rgb(85,85,85)
      & > h3
        font-size 20px
        color white
      .back
        position absolute
        left 10px
        bottom 2px
        height 40px
        .iconfont
          position relative
          line-height 40px
          top 3px
          font-size 22px
          color rgb(255,255,255)
</style>
