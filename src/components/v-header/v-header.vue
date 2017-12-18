<template>
  <div class="header" ref="header">
    <div class="model" :class="model">
      <span class="navigation" @click="showSidebar"></span>
      <h2>{{title}}</h2>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    //接收从父组件传来的标题值
    props: {
      title: {
        type: String,
        default: '今日热闻'           //标题默认值
      }
    },
    beforeMount() {
      console.log(this)
    },
    methods: {
      //显示侧边栏，向上派发事件
      showSidebar() {
        this.$emit('showSide');
      }
    },
    computed: {
      //返回当前模式
      model() {
        return this.isNight ? 'night' : 'morning'
      },
      ...mapGetters([
        'isNight'
      ])
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "v-header.styl"
</style>
