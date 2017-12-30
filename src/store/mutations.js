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
  [types.ADD_NEWS](state,stories){
    state.stories = stories;
  },
  [types.ADD_IDS](state, ids){
    state.ids = ids
  },
  //增加全部加载过的新闻到数组
  [types.ADD_ALL_NEWS](state,stories){
    state.allStories = state.allStories.concat(stories)
  },
  //添加更多的id数组
  [types.ADD_MORE_IDS](state,ids){
  state.ids = state.ids.concat(ids);
  },
  //改变当前新闻详情页id
  [types.ADD_NEW_ID](state,id){
    state.id = id;
  },
  //改变第一次进入首页状态
  [types.CHANGE_FIRST_LOAD](state){
    state.isFirstLoad = !state.isFirstLoad;
  },
  //下拉刷新数据后删除原有数组的新闻
  [types.DELETE_STORIES](state){
    state.stories = [];
    state.ids = [];
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
  [types.CHANGE_GO_TYPES](state,type){
    state.goType = type;
  },
  //增加主题新闻数据
  [types.ADD_THEME](state,payload){
    state.currentTheme = payload
  },
  //改变主编id
  [types.ADD_EDITOR_ID](state,payload){
    state.editor = payload;
  },
  //添加下一篇新闻id
  [types.ADD_NEXT_ID](state,id){
    state.id = id;
    let index = state.ids.indexOf(id);
    if(index < state.ids.length) {
      state.nextId = state.ids[index + 1];
    }
  },
  //改变模式
  [types.CHANGE_MODEL](state){
    state.isNight = !state.isNight;
  },
  //改变首页日期
  [types.ADD_HOMEPAGE_DATE](state,date){
    state.homepageDate = date;
  },
  //改变首页字符串
  [types.ADD_HOMEPAGE_DATE_STR](state,dateStr){
    state.homepageDateStr = dateStr;
  },
  //改变日期和当前字符串
  [types.ADD_DATE](state,date){
    state.date = date;
  },
  //增加日期字符串
  [types.ADD_DATE_STR](state,dateStr){
    state.dateStr = dateStr;
  },
  //主题新闻id数组
  [types.ADD_THEME_NEWID](state,ids){
    state.themeids = ids;
  },
  //增加主题新闻下一篇id
  [types.ADD_THEME_NEXT_ID](state,id){
    state.id = id;
    let index = state.themeids.indexOf(id);
    state.themenextId = state.themeids[index + 1];
  }
}
