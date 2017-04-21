<template>
    <div class="newDetail">
      <div class="content-wrapper">
        <div class="bg-image"><img :src="attachImageUrl(data.image)" v-lazy="attachImageUrl(data.image)"><span class="title">{{data.title}}</span></div>
        <div class="body" v-html="data.body"></div>
      </div>
      <bottommenu @reload="fetchData"></bottommenu>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  import bottommenu from '../BottomMenu/BottomMenu.vue'

  export default {
    data() {
        return {
           data:{}
        }
    },
    watch: {
      '$route'(to,form){
          this.fetchData();
      }
    },
    created() {
      this.fetchData();
    },
    methods:{
        fetchData() {
            axios.get('api/news/'+ this.$store.state.id).then((response) => {
                response.data.body = this.attachBodyContent(response.data.body)
                this.data = response.data;
            }).catch((error) => {
                console.log(error)
            })
        },
        attachImageUrl(srcUrl) {
            if(srcUrl !== undefined){
                return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
            }
        },
        attachBodyContent: function(body) {
          return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
        }
    },
    components:{
        bottommenu
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../static/css/news_qa.auto.css'

  .newDetail
    width 100%
    z-index 10
    .content-wrapper
      position relative
      top 0
      left 0
      bottom 44px
      margin-bottom 20px
      width 100%
      .bg-image
        width 100%
        height 250px
        z-index -1
        .title
          position relative
          bottom 50px
          font-size 20px
          text-align center
          left 10px
          color rgb(255,255,255)
        img
          width 100%
          height 250px


</style>
