import instance from './api/instance'
import config from './config'
const URL = {
  GET_TEXT_LIST: '/quicklyFillIn/listText',
  DELETE_TEXT: '/quicklyFillIn/deleteText',
  SAVE_TEXT: '/quicklyFillIn/saveText'
}

// 这里在开发阶段预处理一下，用于适应同时请求多个后端的情况
Object.keys(URL).forEach(key => {
  URL[key] = `${process.env.NODE_ENV === 'development' ? '/mock' : ''}${config.baseUrl}${URL[key]}`
})

const API = {
  /** 查询接口列表 */
  textList (opts) {
    return instance({
      method: 'get',
      url: URL.GET_TEXT_LIST,
      opts: opts
    })
  },
  deleteText (opts) {
    return instance({
      method: 'get',
      url: URL.DELETE_TEXT,
      opts: opts
    })
  },
  saveText (opts) {
    return instance({
      method: 'post',
      url: URL.SAVE_TEXT,
      opts: opts
    })
  }
}
export default API
export {URL, API}
