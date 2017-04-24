<template>
  <div class="editorsList">
    <sonheader :title="title" @back="back"></sonheader>
    <div class="list">
      <ul>
        <li class="editor border-1px" v-for="editor in this.$store.state.currentTheme.editors">
          <div class="avatar">
            <img :src="attachImageUrl(editor.avatar)" height="35" width="35">
          </div>
          <div class="description">
            <div class="name">{{editor.name}}</div>
            <div class="bio">{{editor.bio}}</div>
          </div>
          <div class="arrow_right"><img src="./arrow_right.png" width="15" height="15"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  import sonheader from '../SonHeader/SonHeader.vue'

  export default {
    data() {
       return {
          title:'主编'
       }
    },
    methods:{
      back() {
         router.push({name:'themeDetail',params:{id:this.$store.state.currentThemeId}})
      },
      attachImageUrl(srcUrl) {
        if(srcUrl !== undefined){
          return srcUrl.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p')
        }
      }
    },
    components:{
       sonheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"

  .list
    position relative
    top 40px
    ul
      padding-left 0
      .editor
        display flex
        height 55px
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 25px
          height 55px
          line-height 55px
          padding-left 10px
          margin-right 15px
          img
            border-radius 50%
        .description
          flex 1
          height 55px
          .name
            font-size 16px
            margin-top 10px
          .bio
            font-size 12px
            margin-top 10px
            color rgb(153,153,153)
        .arrow_right
          flex 0 0 25px
          line-height 55px
          padding-right 10px
</style>
