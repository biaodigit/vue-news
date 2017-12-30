/**
 * Created by luowendi on 2017/4/21.
 */
// export default {
//   getCollect:state => {
//     return state.isCollect ? '取消收藏' : '收藏'
//   },
//   getModel:state => {
//     return state.isNight ? 'night' : 'morning'
//   },
//   getModelText:state => {
//     return state.isNight ? '日间' : '夜间'
//   }
// }
export const currentThemeId = state => state.currentThemeId

export const isNight = state => state.isNight

export const stories = state => state.stories

export const isFirstLoad = state => state.isFirstLoad

export const homepageDate = state => state.homepageDate

export const homepageDateStr = state => state.homepageDateStr

export const id = state => state.id
