<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      scrollX: {
        type: Boolean,
        default: false,
      },
      scrollY: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      pullDown: {
        type: Boolean,
        default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      },
      distance: {
        type: Number,
        default: 50
      }
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      },
    },
    methods: {
      initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: this.scrollX,
          scrollY: this.scrollY,
          click: true
        })

        if (this.listenScroll) {
          let self = this
          this.scroll.on('scroll', (pos) => {
            self.$emit('scroll', pos)
          })
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "scroll.styl"
</style>
