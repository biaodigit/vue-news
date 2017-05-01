<template>
    <div class="newDetail">
      <div class="content-wrapper">
        <div class="bg-image"  v-if="data.image"><img :src="attachImageUrl(data.image)" v-lazy="attachImageUrl(data.image)"><span class="title">{{data.title}}</span></div>
        <div class="body" v-html="data.body" :class="model"></div>
      </div>
      <bottommenu></bottommenu>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  import bottommenu from '../BottomMenu/BottomMenu.vue'

  export default {
    data() {
        return {
           data:{},                                 //初始化当前详情页数据
        }
    },
    //创建生命周期
    created() {
      this.fetchData();
    },
    //检测路由变化
    watch: {
      '$route'(to,form){
        this.fetchData();
      }
    },
    methods:{
      //获取详情页内容
      fetchData() {
        axios.get('api/news/'+ this.$store.state.id).then((response) => {
          response.data.body = this.attachBodyContent(response.data.body)
          this.data = response.data;
        }).catch((error) => {
            console.log(error)
        });

        this.$store.dispatch('addNextId',this.$store.state.id)
      },
      //替换头部背景图片url
      attachImageUrl(srcUrl) {
        if(srcUrl !== undefined){
          return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
        }
      },
      //替换详情内容图片url
      attachBodyContent: function(body) {
        return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
      }
    },
    computed:{
      //返回当前模式
      model() {
        return this.$store.getters.getModel
      }
    },
    //注册组件
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
    .bg-image
      position relative
      width 100%
      height  250px
      z-index -1
      .title
        position absolute
        bottom 0
        font-size 18px
        padding 0 10px 10px 15px
        color rgb(255,255,255)
      img
        position absolute
        width 100%
        height 250px
    .body
      position absolute
      width 100%
      &.morning
        color rgb(51,51,51)
        background-color rgb(255,255,255)
      &.night
        color rgb(184,184,184)
        background-color rgb(52,52,52)

</style>
