/**
 * Created by luowendi on 2017/4/16.
 */
import * as types from './mutation_types'

export default {
  //改变当前主题id
  changeCurrentThemeId:({ commit },id) => {
    commit(types.CHANGE_CURRENT_THEME_ID,id)
  },
  //增加首页新闻数组和首页新闻id数组
  addNews:({ commit },payload) => {
    commit(types.ADD_NEWS,payload)
  },
  //改变当前新闻详情页id
  addNewId:({commit},id) => {
    commit(types.ADD_NEWID,id)
  },
  //改变第一次进入首页状态
  changeFirstLoad:({ commit }) => {
    commit(types.CHANGE_FIRST_LOAD)
  },
  //下拉刷新数据后删除原有数组的新闻
  deleteData:({commit}) => {
    commit(types.DELETE_STORIES);
  },
  //添加详情页底部状态到数组
  changeStoryExtra:({commit},extra) => {
    commit(types.STORY_EXTRA,extra)
  },
  //判断收藏状态
  judgeCollectState:({commit}) => {
    commit(types.JUDGE_COLLECT_STATE);
  },
  //改变收藏状态
  changeCollectState:({commit}) => {
    commit(types.CHANGE_COLLECT_STATE)
  },
  //改变跳转详情页的路由状态，判断是从哪里跳入
  changeGoType:({commit},id) => {
    commit(types.CHANGE_GO_TYPES,id)
  },
  //增加主题新闻数据
  addTheme:({commit},payload) => {
    commit(types.ADD_THEME,payload)
  },
  //改变主编id
  addEditorId:({commit},payload) => {
    commit(types.ADD_EDITOR_ID,payload)
  },
  //增加全部加载过的新闻到数组
  addAllNews:({commit},stories) => {
    commit(types.ADD_ALL_NEWS,stories)
  },
  //添加下一篇新闻id
  addNextId:({commit},id) => {
    commit(types.ADD_NEXT_ID,id)
  },
  changeModel:({commit}) => {
    commit(types.CHANGE_MODEL)
  }
}
