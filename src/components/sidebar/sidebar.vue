<template>
  <div>
    <transition name="fold">
      <div class="sidebar" v-show="showFlag">
        <div class="user">
          <div class="avatar"></div>
          <div class="username">哈哈哈蜜瓜</div>
          <div class="back" @click="hide"><img src="./back.png" width="22" height="22"></div>
        </div>
        <div class="menu-list">
          <div class="menu" @click="goCollect">
            <div class="avatar"><img src="./collect.png" width="20" height="20"></div>
            <div class="name">收藏</div>
          </div>
          <div class="menu">
            <div class="avatar"><i class="icon iconfont icon-xiaoxi"></i></div>
            <div class="name">消息</div>
          </div>
          <div class="menu">
            <div class="avatar"><i class="icon iconfont icon-shezhi"></i></div>
            <div class="name">设置</div>
          </div>
        </div>
        <scroll :data="data" class="themes-list" ref="scroll">
          <ul style="padding-left: 0">
            <li class="themes" v-for="item in data" @click="goTheme(item.id)"
                :class="{'current':currentThemeId===item.id}">
              <div class="icons" v-if="item.id == -1"><i class="icon iconfont icon-shouyeshouye"></i></div>
              <div class="themetitle">{{item.name}}</div>
            </li>
          </ul>
        </scroll>
        <div class="bottom-menu">
          <div class="menu">
            <div class="avatar"><i class="icon iconfont icon-lixianwenjian"></i></div>
            <div class="name">离线</div>
          </div>
          <div class="menu" @click="changeModel">
            <div class="avatar"><img :src="modelImg" width="18" height="18"></div>
            <div class="name">{{modelText}}</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" @click.stop.prevent="hide" v-show="showFlag"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Collect from 'components/collect/collect'
  import {getThemeTitle} from 'common/api/sidebar'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    //接收父组件传值
    props: {
      currentIndex: {
        type: Number,
        default: -1                    //当前高亮主题默认id
      }
    },
    data() {
      return {
        data: [],                        //初始化主题列表数据,
        showFlag: false,
      }
    },
    //生命周期创建观察数据
    created() {
      this.fetchData();
    },
    //观察路由跳转更新数据
    watch: {
      '$route'(to, form) {
        this.fetchData();
      }
    },
    methods: {
      open() {
        this.showFlag = true
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      },
      //隐藏侧边栏，向上派发事件
      hide() {
        this.showFlag = false
      },
      //获取主题列表数据
      fetchData() {
        getThemeTitle().then((res) => {
          this.data = res.data.others

          //由于改api中没有首页的数据，因此在data中添加首页
          this.data.unshift({
            color: 0,
            thumbnail: '',
            description: '首页',
            id: -1,
            name: '首页'
          });
        })
      },
      //跳转收藏页面路由
      goCollect() {
        this.$router.push({name: 'collect'})
      },
      //跳转主题页面路由
      goTheme(id) {
        if (id === -1) {
          this.hide();
          this.$router.push({name: 'homePage'});
          this.setGoType(1)
          this.setThemeId(id)
        } else if (id === this.currentThemeId) {
          this.hide();
        } else {
          this.hide();
          this.setThemeId(id)
          this.$router.push({name: 'themeDetail', params: {id: id}});
        }
      },
      ...mapMutations({
        setThemeId: 'CHANGE_CURRENT_THEME_ID',
        setGoType: 'CHANGE_GO_TYPES',
        changeModel: 'CHANGE_MODEL'
      })
    },
    computed: {
      modelText() {
        return this.isNight ? '日间' : '夜间'
      },
      //改变模式图片
      modelImg() {
        if (!this.isNight) {
          return require('./yejian.png')
        } else {
          return require('./rijian.png')
        }
      },
      ...mapGetters([
        'currentThemeId',
        'isNight'
      ])
    },
    //注册组件
    components: {
      Scroll,
      Collect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "sidebar.styl"
</style>
