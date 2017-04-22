/**
 * Created by luowendi on 2017/4/21.
 */
export default {
  getCollect:state => {
    return state.isCollect ? '取消收藏' : '收藏'
  }
}

