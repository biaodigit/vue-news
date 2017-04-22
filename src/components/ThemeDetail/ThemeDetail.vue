<template>
  <div class="themedetail">
    <v-header @showSide="show" :title="data.name"></v-header>
    <sidebar :sidebarShow="sidebarShow" @hideSidebar="hide" ref="sidebar"></sidebar>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../Header/Header.vue'
  import sidebar from '../Sidebar/Sidebar.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        data:[],
        sidebarShow:false,
      }
    },
    watch:{
      '$route'(to,from){
          this.fetchData();
      }
    },
    created() {
      this.fetchData();
    },
    methods:{
      fetchData() {
          if(this.$store.state.currentThemeId != -1) {
            axios.get('api/theme/' + this.$store.state.currentThemeId).then((response) => {
              this.data = response.data
            }).catch((error) => {
              console.log(error)
            });
          }
      },
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
    computed: {
      currentThemeId() {
        return this.$store.state.currentThemeId;
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
