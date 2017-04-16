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
          this.hide();
      }
    },
    created() {
      this.fetchData();
    },
    methods:{
      fetchData() {
        axios.get('api/theme/'+ this.$route.params.id).then((response) => {
            this.data = response.data
        }).catch((error) => {
            console.log(error)
        });
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
    components:{
      'v-header':header,
      sidebar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
