import Vue from 'vue'
import App from './App'
import router from './router'
import HUI from 'hui'
// import common from 'dolphin_common'
import './index.less'
import 'hui/lib/theme-default/index.css'
import axios from 'axios'
import './icons'

Vue.use(HUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
document.cookie = 'JSESSIONID=82127C4E315813CDCA4C7C2CF15C17E1'
Vue.mixin({
  methods: {
    // 全局错误处理方法，传入对象则显示msg字段，传入string则直接显示string内容
    errorHandler (error) {
      // todo 这里还是有一种情况没有处理到的，当接口504时，或者类似的网络错误，
      // error是axiox封装过的，data所在字段不是error.data而是error.response.data
      // 目前在instance.js中，直接alert了error.message，所以目前这里无需处理；后续如有需要，可以改动
      let { data } = error
      if (typeof data === 'object') {
        // 先尝试读取约定的错误信息字段：msg，如果没有，则读取message字段
        this.$message.error(data.msg || data.message)
      } else if (typeof error === 'string') {
        this.$message.error(data)
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
