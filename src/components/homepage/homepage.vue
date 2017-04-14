<template>
  <div class="homepage">
    <v-header @showSide="show" :title="title"></v-header>
    <sidebar :sidebarShow="sidebarShow"></sidebar>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../header/header.vue'
  import sidebar from '../sidebar/sidebar.vue'

  export default {
      data() {
        return {
            title:'今日热闻',
            sidebarShow:false
        }
      },
      methods:{
        show() {
           this.sidebarShow = !this.sidebarShow;
        }
      },
      components:{
          'v-header':header,
          sidebar
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
