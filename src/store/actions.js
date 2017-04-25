/**
 * Created by luowendi on 2017/4/16.
 */
import * as types from './mutation_types'

export default {
  changeCurrentThemeId:({ commit },id) => {
    commit(types.CHANGE_CURRENT_THEME_ID,id)
  },
  addNews:({ commit },payload) => {
    commit(types.ADD_NEWS,payload)
  },
  addNewId:({commit},id) => {
    commit(types.ADD_NEWID,id)
  },
  changeFirstLoad:({ commit }) => {
    commit(types.CHANGE_FIRST_LOAD)
  },
  changeFirstSide:({ commit }) => {
    commit(types.CHANGE_FIRST_SIDEBAR)
  },
  deleteData:({commit}) => {
    commit(types.DELETE_STORIES);
  },
  changeStoryExtra:({commit},extra) => {
    commit(types.STORY_EXTRA,extra)
  },
  judgeCollectState:({commit}) => {
    commit(types.JUDGE_COLLECT_STATE);
  },
  changeCollectState:({commit}) => {
    commit(types.CHANGE_COLLECT_STATE)
  },
  changeGoType:({commit},id) => {
    commit(types.CHANGE_GO_TYPES,id)
  },
  addTheme:({commit},payload) => {
    commit(types.ADD_THEME,payload)
  },
  addEditorId:({commit},payload) => {
    commit(types.ADD_EDITOR_ID,payload)
  },
  addAllNews:({commit},stories) => {
    commit(types.ADD_ALL_NEWS,stories)
  }
}
