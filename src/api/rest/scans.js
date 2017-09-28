import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = '/photo-web'

export default {
  fetch () {
    return Vue.http.get('order/getCurrMemberScan.do').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.processDtoList
    }).then(function (items) {
      items = items || []
      return items.map((item) => {
        return {
          'id': item.id,
          'reviewId': item.benacoId,
          'title': item.description,
          'thumbnail': '/static/demo-data/paris.jpeg', // TODO
          'status': item.status,
          'createTime': item.createTime
        }
      })
    })
  },
  add (data) {
    return Vue.http.post('engine/addPhotos.do', data).then(function (data) {
      if (data.error) {
        throw data.error
      }
      return data.panoramaEngineDto
    })
  }
}
