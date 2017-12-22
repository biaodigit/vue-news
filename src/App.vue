<template>
  <div id="app">
    <v-header @showSide="show"></v-header>
    <sidebar ref="sidebar"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import Sidebar from 'components/sidebar/sidebar'
  export default {
    name: 'app',
    methods: {
      //显示侧边栏，在其显示时访问他的获取数据方法，从而使better-scroll能够计算出中间主题列表高度
      show() {
        this.$refs.sidebar.open()
      },
    },
    components: {
      VHeader,
      Sidebar
    }
  }
</script>

<style>

</style>
