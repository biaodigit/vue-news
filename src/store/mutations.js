/**
 * Created by luowendi on 2017/4/16.
 */
import * as types from './mutation_types'

export default {
  //改变当前主题id
  [types.CHANGE_CURRENT_THEME_ID](state,id){
     state.currentThemeId = id;
  },
  //增加首页新闻数组和首页新闻id数组
  [types.ADD_NEWS](state,payload){
    state.stories = state.stories.concat(payload.stories);
    state.ids = state.ids.concat(payload.ids);
  },
  //改变当前新闻详情页id
  [types.ADD_NEWID](state,id){
    state.id = id;
  },
  //改变第一次进入首页状态
  [types.CHANGE_FIRST_LOAD](state){
    state.isFirstLoad = !state.isFirstLoad;
  },
  //下拉刷新数据后删除原有数组的新闻
  [types.DELETE_STORIES](state){
    state.stories = [];
  },
  //添加详情页底部状态到数组
  [types.STORY_EXTRA](state,extra){
    state.comments = extra.comments;
    state.long_comments = extra.long_comments;
    state.short_comments = extra.short_comments;
    state.popularity = extra.popularity
  },
  //判断收藏状态
  [types.JUDGE_COLLECT_STATE](state){
    if(state.isCollectIds.indexOf(state.id) < 0){
       state.isCollect = false;
    }else{
       state.isCollect = true;
    }
  },
  //改变收藏状态
  [types.CHANGE_COLLECT_STATE](state){
    let index = state.isCollectIds.indexOf(state.id)
    if(index < 0){
        state.isCollect = true;
        state.isCollectIds.push(state.id);
        state.allStories.forEach((story) => {
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
  //改变跳转详情页的路由状态，判断是从哪里跳入
  [types.CHANGE_GO_TYPES](state,id){
    state.goType = id;
  },
  //增加主题新闻数据
  [types.ADD_THEME](state,payload){
    state.currentTheme = payload;
  },
  //改变主编id
  [types.ADD_EDITOR_ID](state,payload){
    state.editor = payload;
  },
  //增加全部加载过的新闻到数组
  [types.ADD_ALL_NEWS](state,stories){
    state.allStories = state.allStories.concat(stories)
  },
  //添加下一篇新闻id
  [types.ADD_NEXT_ID](state,id){
    state.id = id;
    let index = state.ids.indexOf(id);
    state.nextId = state.ids[++index];
  }
}
