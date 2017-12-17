<template>
  <div class="newList">
    <div class="model" :class="model">
      <ul>
        <li v-for="story in this.$store.state.stories" :key="story.id" class="new border-1px" @click="goNew(story.id)" :class="model">
          <span class="title">{{story.title}}</span>
          <span class="avatar" v-for="(item,index) in story.images" v-if="index<1"><img v-lazy="attachImageUrl(item)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'

  export default {
    data() {
      return {
        date:Date,
        dateStr:'',
      }
    },
    //生命周期开始创建数据观察
    created() {
      if(this.$store.state.isFirstLoad) {
        this.fetchData();
        this.$store.dispatch('changeFirstLoad');
        this.initDate();
      }
      this.$on('refresh',() => {
        this.initDate();
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
          this.$store.dispatch('addAllNews',stories);
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
        this.$store.dispatch('addDate',new Date(this.date.getTime()));
        this.$store.dispatch('addHomePageDate',new Date(this.date.getTime()));
//        this.$store.dispatch('addDate',this.date);
//        this.$store.dispatch('addHomePageDate',this.date);
        this.changeDateStr();
      },
      //把日期改为字符串形式
      changeDateStr() {
        let nowDate = new Date(this.$store.state.homepageDate.getTime());
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth()+1;
        let date = nowDate.getDate();
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;

        this.dateStr = year + month + date;
        this.$store.dispatch('addDateStr',this.dateStr)
        this.$store.dispatch('addHomePageDateStr',this.dateStr)
      },
      //将日期推前一天
      decreaseDateStr() {
        let homeDate = this.$store.state.homepageDate;
        homeDate.setDate(homeDate.getDate() - 1)
        this.$store.dispatch('addDate',new Date(homeDate.getTime()))
        this.$store.dispatch('addHomePageDate',new Date(homeDate.getTime()))
        this.changeDateStr();
      },
      //获取前一天的新闻
      fetchMoreDate() {
        axios.get('api/news/before/'+ this.$store.state.homepageDateStr).then((response) => {
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
        this.$store.dispatch('changeGoType',1);

      }
    },
    computed:{
      //返回当前模式
      model() {
        return this.$store.getters.getModel
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl";

  .newList
    position relative
    top 40px
    width 100%
    height 100%
    .model
      &.morning
        color rgb(51,51,51)
        background-color rgb(255,255,255)
      &.night
        color rgb(184,184,184)
        background-color rgb(52,52,52)
      .new
        display flex
        position relative
        left -15px
        padding 20px 0 20px 10px
        &.morning
          border-1px(rgba(7,17,27,0.1))
        &.night
          border-1px(rgb(43,43,43))
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
