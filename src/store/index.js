import Vue from 'vue'
import Vuex from 'vuex'
import scans from './modules/scans'
import notifications from './modules/notifications'
import logger from './logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    scans,
    notifications
  },
  strict: debug,
  plugins: debug ? [logger()] : []
})
