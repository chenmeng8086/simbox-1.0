import { createAPI } from '../util'
import config from '../config'
import axios from 'axios'
import { Message } from 'hui'

const REQUEST_SUCCESS = '200'

const baseUrl = {
  // 这里baseUrl不在这里指定，统一在API中指定，更方便灵活
  // mock: 'http://10.10.64.25:7300/mock/5c0b5c4b8e3399272cf2fb04/pdms/ui',
  mock: '',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock']

const http = axios.create({
  timeout: 20000,
  withCredentials: true,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: baseUrl
})

// 相应拦截器
http.interceptors.response.use(function (response) {
  // 请求多语言的json文件
  if (response.config.url.indexOf('json') > -1) {
    return response
  }

  // 根据响应数据判断是否登录过期
  if (response.data.errorCode === 'pleaseRefreshByHeader') {
    let refreshUrl = response.headers['refresh-url'].split('?')[0]
    refreshUrl = refreshUrl + '?service=' + location.protocol + '//' + location.host + location.pathname + encodeURIComponent(location.search)
    location.href = refreshUrl
  }

  // 对错误进行统一处理
  if (response.data.code !== REQUEST_SUCCESS) {
    if (!response.config.noMsg && response.data.msg) {
      Message.error('错误')
    }
    return Promise.reject(response)
  } else if (response.data.code === REQUEST_SUCCESS && response.config.successNotify) { // 弹出成功提示
    Message.success('success !')
  }
  return Promise.resolve({
    code: response.data.code,
    msg: response.data.msg,
    data: response.data.data
  })
}, function (error) {
  if (error.message.indexOf('timeout') > -1) {
    // 多语言需要自己在项目中配置
    Message.error('超时')
  } else {
    // 其他错误返回错误的message字段内容（如有其他需求可修改）
    Message.error(error.message)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  // if (config.method === 'get') {
  //   // 防止某些浏览器缓存get请求，导致数据不能实时刷新（这里的策略是在每个get请求后面加上时间戳，强制浏览器从服务器获取新数据）
  //   if (config.params) {
  //     config.params['_'] = new Date().getTime()
  //   } else {
  //     config.params = {
  //       _: new Date().getTime()
  //     }
  //   }
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default createAPI(http)

export {
  http
}
