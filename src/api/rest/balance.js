import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = '/photo-web'

export default {
  balance (memberId) {
    return Vue.http.post('balance/balance.do', {
      'balanceDto': {
        'memberId': memberId
      }
    }).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return (resp.data.balanceDto || {amount: 0}).amount
    })
  }

}
