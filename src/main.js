// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import vuex from 'vuex'
import './stylus/main.styl'
import App from './App'
import router from './router'
import store from './store'
import Router from 'vue-router'

Vue.use(Vuetify)
Vue.use(vuex)
Vue.use(VueResource)
Vue.config.productionTip = false

store.dispatch('users/current').then((current) => {
  router.routes.push({
    path: '/',
    redirect: store.getters['users/checkPermission']('/menu/user/scans') ? '/scans' : '/admin/recharge'
  })
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router: new Router(router),
    template: '<App/>',
    components: {App}
  })
}).catch(() => {
  location.href = 'login.html'
})

