<template>
  <div class="home-page" ref="homepage">
    <scroll :pull-up="pullUp" @pullUp="fetchMoreDate" v-if="stories.length" :data="stories" class="home-page-content">
      <div>
        <div v-if="sliders.length" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="item in sliders">
                <img :src="item.image">
              </div>
            </slider>
          </div>
        </div>
        <div class="newList">
          <div class="model" :class="model">
            <ul style="padding: 0">
              <li v-for="story in stories" :key="story.id" class="new border-1px"
                  @click="goNew(story.id)" :class="model">
                <span class="title">{{story.title}}</span>
                <span class="avatar" v-for="(item,index) in story.images" v-if="index<1"><img
                  :src="attachImageUrl(item)"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import {getSlider, getNews} from 'api/homePage'
  import {attachImageUrl} from 'common/js/dom'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        sliders: [],
        date: Date,
        dateStr: '',
        pullUp: true
      }
    },
    created() {
      if (this.isFirstLoad) {
        this.fetchData();
        this.setFirstLoad();
        this.initDate();
      }
    },
    mounted() {
      setTimeout(() => {
        this._getSlider()
      }, 20)
    },
    methods: {
      _getSlider() {
        getSlider().then((res) => {
          this.sliders = this.initImage(res.data.top_stories)
        })
      },
      initImage(data) {
        data.map((item) => {
          item.image = attachImageUrl(item.image)
        })
        return data
      },
      //获取最新消息
      fetchData() {
        getNews().then((response) => {
          let stories = response.data.stories;
          let ids = stories.map(story => story.id)

          this.addNews({
            stories: stories,
            ids: ids
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
        this.addDate(new Date(this.date.getTime()))
        console.log(new Date(this.date.getTime()))
        this.changeDateStr();
      },
      //把日期改为字符串形式
      changeDateStr() {
        let nowDate = new Date(this.homepageDate.getTime());
        let year = nowDate.getFullYear() + '';
        let month = nowDate.getMonth() + 1;
        let date = nowDate.getDate();
        month = month < 10 ? '0' + month : month + '';
        date = date < 10 ? '0' + date : date + '';

        this.dateStr = year + month + date;
        this.addDateStr(this.dateStr)
      },
      //将日期推前一天
      decreaseDateStr() {
        let homeDate = this.homepageDate;
        homeDate.setDate(homeDate.getDate() - 1)
        this.addDate(new Date(homeDate.getTime()))
        this.changeDateStr();
      },
      //获取前一天的新闻
      fetchMoreDate() {
        console.log(this.homepageDateStr)
        axios.get('api/news/before/' + this.homepageDateStr).then((response) => {
          let stories = response.data.stories;
          let ids = stories.map(story => story.id)

          this.addNews({
            stories: stories,
            ids: ids
          })
        }).catch((error) => {
          console.log(error)
        })
        this.decreaseDateStr();
      },
      //去往详情页
      goNew(id) {
        this.setGoType({
          id: id,
          type: 1
        })
        this.$router.push({name: 'newDetail', params: {id: id}});
      },
      show() {
        this.$refs.sidebar.open()
      },
      ...mapMutations({
        setFirstLoad: 'CHANGE_FIRST_LOAD'
      }),
      ...mapActions([
        'addNews',
        'addDate',
        'addDateStr',
        'setGoType'
      ])
    },
    computed: {
      model() {
        return this.isNight ? 'night' : 'morning'
      },
      ...mapGetters([
        'stories',
        'isNight',
        'isFirstLoad',
        'homepageDate',
        'homepageDateStr'
      ])
    },
    //注册组件
    components: {
      Slider,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "home-page.styl"
</style>
