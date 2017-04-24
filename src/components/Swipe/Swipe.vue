<template>
  <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in data" :key="item.id">
        <img :src="attachImageUrl(item.image)" @click="goNew(item.id)">
        <span class="title" @click="goNew(item.id)">{{item.title}}</span>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  export default {
      data() {
        return {
           data:[]
        }
      },
      created() {
          this.fetchData()
      },
      methods:{
          fetchData() {
              axios.get('api/news/latest').then((response) => {
                  this.data = response.data.top_stories;
              }).catch((error) => {
                  console.log(error)
              })
          },
          attachImageUrl: function(srcUrl) {
            if (srcUrl !== undefined) {
              return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
            }
          },
          goNew(id) {
            this.$store.dispatch('addNewId',id);
            router.push({ name:'newDetail', params:{ id:id }})
            this.$store.dispatch('changeGoType',1)
          }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .swipe
    position relative
    top 40px
    height 200px
    width 100%
    img
      width 100%
      height 200px
      z-index 1
    .title
      position absolute
      top 150px
      padding 0 10px
      z-index 2
      font-size 20px
      color rgb(255,255,255)
      height 50px
</style>
