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
  [types.ADD_NEWID](state,id){
    state.id = id;
  },
  [types.CHANGE_FIRST_LOAD](state){
    state.isFirstLoad = !state.isFirstLoad;
  },
  [types.CHANGE_FIRST_SIDEBAR](state){
    state.isFirstSide = !state.isFirstSide
  },
  [types.DELETE_STORIES](state){
    state.stories = [];
  },
  [types.STORY_EXTRA](state,extra){
    state.comments = extra.comments;
    state.long_comments = extra.long_comments;
    state.short_comments = extra.short_comments;
    state.popularity = extra.popularity
  },
  [types.JUDGE_COLLECT_STATE](state){
    if(state.isCollectIds.indexOf(state.id) < 0){
       state.isCollect = false;
    }else{
       state.isCollect = true;
    }
  },
  [types.CHANGE_COLLECT_STATE](state){
    let index = state.isCollectIds.indexOf(state.id)
    if(index < 0){
        state.isCollect = true;
        state.isCollectIds.push(state.id);
        state.stories.forEach((story) => {
          if(story.id == state.id){
            state.isCollectNews.push(story);
          }
        })
    }else{
      state.isCollect = false;
      state.isCollectIds.splice(index,1);
      state.isCollectNews.splice(index,1)
    }
  },
  [types.CHANGE_GO_TYPES](state,id){
    state.goType = id;
  },
  [types.ADD_THEME](state,payload){
    state.currentTheme = payload;
  }
}
