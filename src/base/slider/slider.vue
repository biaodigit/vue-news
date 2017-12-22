<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        currentPageIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initScroll()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)
    },
    methods: {
      _setSliderWidth() {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let children = this.children[i]
          addClass(children, 'slider-item')

          width += sliderWidth
          children.style.width = `${sliderWidth}px`
          children.style.height = `${sliderWidth * 0.5}px`
        }
        if (this.loop) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = `${width}px`
      },
      _initScroll() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })

        this.slider.on('scrollEnd', this._changePageIndex)
      },
      _changePageIndex() {
        this.currentPageIndex = this.slider.getCurrentPage().pageX
        if (this.autoPlay) {
          this._play()
        }
      },
      _play() {
        clearTimeout(this.timer)
        if (this.autoPlay) {
          this.timer = setTimeout(() => {
            this.slider.next()
          }, this.interval)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "slider.styl"
</style>
