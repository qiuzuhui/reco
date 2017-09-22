import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ScanList from '@/components/ScanList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/scans',
      name: 'ScanList',
      component: ScanList
    }
  ]
})
