import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = '/photo-web'

export default {
  login (user) {
    return Vue.http.post('member/login.do', {memberDto: user}).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto
    })
  },
  logout () {
    return Vue.http.post('member/logout.do', {}).then(function (resp) {
      // TODO
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto
    })
  },
  current () {
    return Vue.http.get('member/getCurrMember').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto
    })
  },
  register (user) {
    return Vue.http.post('member/register.do', {memberDto: user}).then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDto
    })
  },
  fetch () {
    return Vue.http.get('member/getAllMember.do').then(function (resp) {
      if (resp.data.error) {
        throw resp.data.error
      }
      return resp.data.memberDtoList
    })
  }

}
