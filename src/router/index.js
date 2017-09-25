import Vue from 'vue'
import Router from 'vue-router'
import ScanList from '@/components/ScanList'
import ScanCreator from '@/components/ScanCreator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/scans'
    },
    {
      path: '/scans',
      name: 'ScanList',
      component: ScanList
    },
    {
      path: '/scans/new',
      name: 'ScanCreator',
      component: ScanCreator
    }
  ]
})
