import axios from 'axios'

export function getThemeTitle() {
  return axios.get('api/themes').then((res) => {
    return Promise.resolve(res)
  })
}
