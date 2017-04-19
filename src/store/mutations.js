/**
 * Created by luowendi on 2017/4/16.
 */
import * as types from './mutation_types'

export default {
  [types.CHANGE_CURRENT_THEME_ID](state,id){
     state.currentThemeId = id;
  },
  [types.ADD_NEWS](state,payload){
    state.stories = state.stories.concat(payload.stories);
    state.ids = state.ids.concat(payload.ids);
  },
  [types.CHANGE_FIRST_LOAD](state){
    state.isFirstLoad = !state.isFirstLoad;
  },
  [types.CHANGE_FIRST_SIDEBAR](state){
    state.isFirstSide = !state.isFirstSide
  },
  [types.DELETE_STORIES](state){
    state.stories = [];
  }
}
