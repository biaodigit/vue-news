<template>
  <div class="newList">
    <ul>
      <li v-for="story in this.$store.state.stories" :key="story.id" class="new border-1px">
        <span class="title">{{story.title}}</span>
        <span class="avatar"><img :src="attachImageUrl(story.images[0])"></span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'

  export default {
      data() {
        return {
           date:Date,
           datestr:''
        }
      },
      created() {
          if(this.$store.state.isFirstLoad) {
            this.fetchData();
            this.$store.dispatch('changeFirstLoad')
          }
          this.initDate();
          this.$on('refresh',() => {
              this.refreshData();
          })
          this.$on('loadMore',() => {
              this.loadMoreData();
          })
      },
      methods:{
          refreshData() {
            this.$store.dispatch('deleteData');
            this.$nextTick(() => {
                this.fetchData();
            })
          },
          loadMoreData() {
            this.$nextTick(() => {
                this.fetchMoreDare();
            })
          },
          fetchData() {
              axios.get('api/news/latest').then((response) => {
                 let stories = response.data.stories;
                 let ids = stories.map(story => story.id)

                  this.$store.dispatch('addNews',{
                      stories:stories,
                      ids:ids
                  })
              }).catch((error) => {
                  console.log(error)
              })
          },
          attachImageUrl(srcUrl) {
            if (srcUrl !== undefined) {
              return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
            }
          },
          //获取第一次加载当前日期
          initDate() {
              this.date = new Date();
              this.changeDateStr();
          },
          //把日期改为字符串形式
          changeDateStr() {
              let year = this.date.getFullYear();
              let month = this.date.getMonth() + 1;
              let day = this.date.getDate();
              month = month < 10 ? '0'+ month : month;
              day = day  < 10 ? '0' + day : day
              this.datestr = year + month + day;
          },
          //将日期推前一天
          decreaseDateStr() {
             this.date.setDate(this.date.getDate() - 1);
             this.changeDateStr();
          },
          //获取前一天的新闻
          fetchMoreDare() {
              axios.get('api/news/before/'+ this.datestr).then((response) => {
                let stories = response.data.stories;
                let ids = stories.map(story => story.id)

                this.$store.dispatch('addNews',{
                  stories:stories,
                  ids:ids
                })
              }).catch((error) => {
                  console.log(error)
              })

             this.decreaseDateStr();
          }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"

  .newList
    position relative
    top 40px
    width 100%
    height 100%
    .new
      display flex
      padding 13px 10px
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
