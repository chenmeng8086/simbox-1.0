import Vue from 'vue'
import App from './App'
import router from './router'
import HUI from 'hui'
// import common from 'dolphin_common'
import './index.less'
import 'hui/lib/theme-default/index.css'
import axios from 'axios'

Vue.use(HUI)
// Vue.use(common)

Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
