import instance from './api/instance'
import config from './config'
const Qs = require('qs')
const URL = {
  GET_INTERFACE_LIST: '/api/file/dirList',
  GET_DEPT_LIST: '/common/dept/list',
  GET_GROUP_LIST: '/icon/group/list',
  ADD_GROUP: '/icon/group/add',
  EDIT_GROUP: '/icon/group/edit',
  DELETE_GROUP: '/icon/group/delete',
  GET_LIBRARY_LIST: '/icon/library/list',
  DELETE_LIBRATY: '/icon/library/delete',
  UPLOAD_LIBRARY: '/icon/icon/upload'
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
  },
  /** 添加分组列表 */
  addGroup (opts) {
    return instance({
      method: 'post',
      url: URL.ADD_GROUP,
      opts: {...opts,
        paramsSerializer: function (params) {
          return Qs.stringify(params, {arrayFormat: 'repeat'})
        }}
    })
  },
  /** 编辑分组列表 */
  editGroup (opts) {
    return instance({
      method: 'post',
      url: URL.EDIT_GROUP,
      opts: {...opts,
        paramsSerializer: function (params) {
          return Qs.stringify(params, {arrayFormat: 'repeat'})
        }}
    })
  },
  /** 删除分组列表 */
  deleteGroup (opts) {
    return instance({
      method: 'get',
      url: URL.DELETE_GROUP,
      opts: opts
    })
  },
  /** 获取图标库列表 */
  getLibraryList (opts) {
    return instance({
      method: 'post',
      url: URL.GET_LIBRARY_LIST,
      opts: {...opts,
        paramsSerializer: function (params) {
          return Qs.stringify(params, {arrayFormat: 'repeat'})
        }}
    })
  },
  /** 删除图标库 */
  deleteLibrary (opts) {
    return instance({
      method: 'post',
      url: URL.DELETE_LIBRATY,
      opts: opts
    })
  },
  /** 保存数据接入配置 */
  uploadLibrary (opts) {
    console.log('opts')
    console.log(opts)
    return instance({
      method: 'post',
      url: `${URL.UPLOAD_LIBRARY}?groupId=7a60a41c-0b83-406d-83f8-37cfd88e737a`,
      opts: opts
    })
  }
}
export default API
export {URL, API}
