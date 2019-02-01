import Vue from 'vue'
import Router from 'vue-router'
import IconComponent from '../components/icons-library/index.vue'
import Symbol from '../components/symbols-library/index'
import QuickFill from '../components/quick-fill/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/components'
    }, {
      path: '/components',
      name: 'Symbol',
      component: Symbol
    }, {
      path: '/icons',
      name: 'icons',
      component: IconComponent
    }, {
      path: '/quickFill',
      name: 'quickFull',
      component: QuickFill
    }
  ]
})
