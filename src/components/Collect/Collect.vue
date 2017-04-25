<template>
  <transition name="fold">
    <div class="collect">
      <sonheader @back="back" :title="title"></sonheader>
      <div class="collectNewList">
        <ul>
          <li v-for="story in data" class="new border-1px" @click="goNew(story.id)">
            <span class="title">{{story.title}}</span>
            <span class="avatar"><img :src="attachImageUrl(story.images[0])"></span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import router from '../../router'
  import sidebar from '../Sidebar/Sidebar.vue'
  import sonheader from '../SonHeader/SonHeader.vue'

  export default {
    data() {
      return {
         data:this.$store.state.isCollectNews,
         sidebarShow:false,
         title:'收藏'
      }
    },
    created() {
      this.fetchCollectData();
    },
    methods:{
      fetchCollectData() {

      },
      back() {
        let id = this.$store.state.currentThemeId;
        if(this.$store.state.currentThemeId > 0){
            router.push({name:'themeDetail',params:{id:id}})
        }else{
            router.push({name:'homePage'})
        }
      },
      attachImageUrl(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      goNew(id) {
        this.$store.state.id = id;
        router.push({ name:'newDetail', params:{ id:id }});
        this.$store.dispatch('judgeCollectState');
        this.$store.dispatch('changeGoType',2)
        console.log(this.$store.state.currentThemeId)
      }
    },
    components:{
        sonheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .collect
    width 100%
    height 100%
    z-index 100
    background rgb(255,255,255)
    transform translate3d(0,0,0)
    &.fold-enter-active,&.fold-leave-active
      transition all 0.5s
    &.fold-enter,&.fold-leave-active
      transform translate3d(100%,0,0)
    .collectNewList
      position absolute
      top 40px
      width 100%
      z-index 30
      .new
        display flex
        position relative
        left -15px
        padding 15px 0 15px 10px
        border-1px(rgba(7,17,27,0.1))
        .title
          flex 1
          margin-right 10px
          line-height 20px
        .avatar
          flex 0 0 70px
          width 70px
          height 55px
          img
            width 70px
            height 55px

</style>
