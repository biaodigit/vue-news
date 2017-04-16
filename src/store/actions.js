/**
 * Created by luowendi on 2017/4/16.
 */
import * as types from './mutation_types'

export default {
  changeCurrentThemeId:({ commit },id) => {
    commit(types.CHANGE_CURRENT_THEME_ID,id)
  }
}
