<template>
  <div class="editor">
    <son-header :title="this.$store.state.editor.name" @back="back"></son-header>
    <div class="content" v-html="this.editor"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  import SonHeader from '../son-header/son-header'

  export default {
    data() {
      return {
        editor: {}                   //主编信息
      }
    },
    //生命周期创建数据观察
    created() {
      this.fetchEditor();
    },
    //观察路由跳转更新数据
    watch: {
      '$route'(to, from) {
        this.fetchEditor();
      }
    },
    methods: {
      //获取主编信息
      fetchEditor() {
        let id = this.$store.state.editor.id;
        axios.get('api/editor/' + id + '/profile-page/ios').then((response) => {
          response.data = this.attachImageUrl(response.data);
          this.editor = response.data;
        })
      },
      //对图片url进行转化
      attachImageUrl: function (body) {
        return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
      },
      //返回上一级路由
      back() {
        router.go(-1);
      }
    },
    //注册组件
    components: {
      SonHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    position relative
    top 30px
    margin 0

</style>
