<template>
  <div class="homepage">
    <v-header @showSide="show" :title="title"></v-header>
    <sidebar :sidebarShow="sidebarShow" @hideSidebar="hide" ref="sidebar"></sidebar>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../Header/Header.vue'
  import sidebar from '../Sidebar/Sidebar.vue'

  export default {
      data() {
        return {
            title:'今日热闻',
            sidebarShow:false
        }
      },
      methods:{
        show() {
           this.sidebarShow = true;
           if(this.sidebarShow){
               this.$refs.sidebar.fetchData();
           }
        },
        hide() {
          this.sidebarShow = false;
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
