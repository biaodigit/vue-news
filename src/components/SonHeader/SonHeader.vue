<template>
  <div class="sonHeader">
    <span class="back" @click="back "><img src="./back.png" width="20" height="20"></span><h3>{{title}}</h3>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
         title:{
             type:String
         }
      },
      methods:{
         back() {
            this.$emit('back')

         }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .sonHeader
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
