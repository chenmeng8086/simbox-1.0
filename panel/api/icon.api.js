import instance from './api/instance'
import config from './config'
const URL = {
  GET_INTERFACE_LIST: '/api/file/dirList',
  GET_DEPT_LIST: '/common/dept/list',
  GET_GROUP_LIST: '/icon/group/list'
}

// 这里在开发阶段预处理一下，用于适应同时请求多个后端的情况
Object.keys(URL).forEach(key => {
  URL[key] = `${process.env.NODE_ENV === 'development' ? '/mock' : ''}${config.baseUrl}${URL[key]}`
})

const API = {
  /** 查询接口列表 */
  interfaceList (opts) {
    return instance({
      method: 'get',
      url: URL.GET_INTERFACE_LIST,
      opts: opts
    })
  },
  /** 获取部门列表 */
  getDeptList (opts) {
    return instance({
      method: 'get',
      url: URL.GET_DEPT_LIST,
      opts: opts
    })
  },
  /** 获取分组列表 */
  getGroupList (opts) {
    return instance({
      method: 'get',
      url: URL.GET_GROUP_LIST,
      opts: opts
    })
  }
}

export default API
export {URL, API}
