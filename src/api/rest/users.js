import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = '/photo-web'

export default {
  login (user) {
    Vue.http.post('member/login.do', {memberDto: user}).then(function (data) {
      if (data.error) {
        throw data.error
      }
      return data.memberDto
    })
  }

}
