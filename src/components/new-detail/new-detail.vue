<template>
    <div class="newDetail">
      <div class="content-wrapper">
        <div class="bg-image"  v-if="data.image"><img :src="attachImageUrl(data.image)" v-lazy="attachImageUrl(data.image)"><span class="title">{{data.title}}</span></div>
        <div class="body" v-html="data.body" :class="model"></div>
      </div>
      <bottom-menu></bottom-menu>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  import BottomMenu from '../bottom-menu/bottom-menu'
  import {mapGetters} from 'vuex'

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
        axios.get('api/news/'+ this.id).then((res) => {
          res.data.body = this.attachBodyContent(res.data.body)
          this.data = res.data;
          console.log(res)
        }).catch((error) => {
            console.log(error)
        });

//        this.$store.dispatch('addNextId',this.id)
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
        return this.isNight ? 'night' : 'morning'
      },
      ...mapGetters([
        'id',
        'isNight'
      ])
    },
    //注册组件
    components:{
      BottomMenu
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "new-detail.styl"
  @import '../../../static/css/news_qa.auto.css'
</style>
