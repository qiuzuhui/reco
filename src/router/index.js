import Vue from 'vue'
import Router from 'vue-router'
import ScanList from '@/components/ScanList'
import ScanCreator from '@/components/ScanCreator'
import ReCharge from '@/components/ReCharge'
import PanoramaUploader from '@/components/PanoramaUploader'

Vue.use(Router)

export default {
  routes: [
    {
      path: '/scans',
      name: 'ScanList',
      component: ScanList
    },
    {
      path: '/scans/new',
      name: 'ScanCreator',
      component: ScanCreator
    },
    {
      path: '/admin/recharge',
      name: 'ReCharge',
      component: ReCharge
    },
    {
      path: '/admin/panorama',
      name: 'PanoramaUploader',
      component: PanoramaUploader
    }
  ]
}
