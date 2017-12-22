<template>
  <div class="home-page" ref="homepage">
    <div v-if="sliders.length" class="slider-wrapper">
      <div class="slider-content">
        <slider>
          <div v-for="item in sliders">
            <img :src="item.image">
          </div>
        </slider>
      </div>
    </div>
    <!--<home-page-detail ref="homePageDetail"></home-page-detail>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import HomePageDetail from 'components/home-page-detail/home-page-detail'
  import {getSlider} from 'api/homePage'
  import {attachImageUrl} from 'common/js/dom'

  export default {
    data() {
      return {
        sliders: []
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
//      attachImageUrl(url) {
//        if (url !== 'undefined') {
//          let reg = /http\w{0,1}:\/\/p/g
//          return url.replace(reg, 'https://images.weserv.nl/?url=p')
//        }
//      },
      //显示侧边栏，在其显示时访问他的获取数据方法，从而使better-scroll能够计算出中间主题列表高度
      show() {
        this.$refs.sidebar.open()
      },
    },
    //注册组件
    components: {
      Slider
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "home-page.styl"
</style>
