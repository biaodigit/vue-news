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
    data() {
      return {
        scrollY: -1
      }
    },
    mounted() {
//      setTimeout(() => {
//        this.initScroll()
//      }, 20)
    },
    watch: {
      data() {
//        setTimeout(() => {
//          this.refresh()
//        },20)
      },
    },
    methods: {
      initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
        if(this.listenScroll){
          let self = this
          this.scroll.on('scroll',(pos) => {
            self.$emit('scroll',pos)
          })
        }

        if(this.pullDown){
          this.scroll.on('touchEnd', (pos) => {
            if(pos.y >= this.distance) {
              this.$emit('pullDownRefresh')
            }
          })
        }

        if (this.pullUp) {
            this.scroll.on('touchEnd', (pos) => {
              if(pos.y <= this.scroll.maxScrollY - this.distance){
                this.$emit('pullUpLoad')
              }
            })
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style>
  .scroll {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>
