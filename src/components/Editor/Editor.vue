<template>
  <div class="editor">
    <sonheader :title="this.$store.state.editor.name" @back="back"></sonheader>
    <div class="content" v-html="this.editor"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  import sonheader from '../SonHeader/SonHeader.vue'

  export default {
    data() {
       return {
         editor:{}
       }
    },
    watch:{
       '$route'(to,from) {
           this.fetchEditor();
       }
    },
    created() {
      this.fetchEditor();
    },
    methods:{
       fetchEditor() {
         let id = this.$store.state.editor.id;
         axios.get('api/editor/'+ id + '/profile-page/ios').then((response) => {
            response.data = this.attachImageUrl(response.data);
            this.editor = response.data;
         })
       },
      attachImageUrl: function(body) {
        return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
      },
      back() {
         router.go(-1);
      }
    },
    components:{
       sonheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    position relative
    top 40px

</style>
