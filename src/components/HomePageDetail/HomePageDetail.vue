<template>
  <div class="newList">
    <ul>
      <li v-for="story in this.$store.state.stories" :key="story.id" class="new border-1px" @click="goNew(story.id)">
        <span class="title">{{story.title}}</span>
        <span class="avatar" v-for="(item,index) in story.images" v-if="index<1"><img v-lazy="attachImageUrl(item)"></span>
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
      //创建生命周期
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
          //下拉刷新回掉函数
          refreshData() {
            this.$store.dispatch('deleteData');
            this.$nextTick(() => {
                this.fetchData();
            })
          },
          //上拉加载回掉函数
          loadMoreData() {
            this.$nextTick(() => {
                this.fetchMoreDate();
            })
          },
          //获取最新消息
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
          //转换图片url
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
            let month = this.date.getMonth();
            let date = this.date.getDate();
            month = month < 10 ? '0' + month : month;
            date = date < 10 ? '0' + date : date;

            this.datestr = year + month + date;
          },
          //将日期推前一天
          decreaseDateStr() {
            this.date.setDate(this.date.getDate() - 1);
            this.changeDateStr();
          },
          //获取前一天的新闻
          fetchMoreDate() {
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
          },
          //隐藏侧边栏，向上派发事件
          hideSidebar() {
              this.$emit('hideSidebar')
          },
          //去往详情页
          goNew(id) {
              this.$store.state.id = id;
              router.push({ name:'newDetail', params:{ id:id }});
              this.$store.dispatch('judgeCollectState');
              this.$store.dispatch('changeGoType',1)
          }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .newList
    position relative
    top 40px
    width 100%
    height 100%
    .new
      display flex
      position relative
      left -15px
      padding 20px 0 20px 10px
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
          img[lazy=loading]
            height 55px
            width 70px
            margin auto
</style>
