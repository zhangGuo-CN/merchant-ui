import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import page1 from '@/pages/page1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: page1
    }
  ]
})
