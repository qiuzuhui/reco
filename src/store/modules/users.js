import api from '../../api'

export default {
  namespaced: true,
  state: {
    data: [],
    current: null
  },
  mutations: {
    setCurrent (state, current) {
      state.current = current
    }
  },
  actions: {
    async login ({commit}) {
      let current = await api.users.current()
      commit('setCurrent', current)
      return current
    },

    async current ({commit}) {
      let current = await api.users.current()
      commit('setCurrent', current)
      return current
    },

    logout ({commit}) {
      commit('setCurrent', null)
      return api.users.logout()
    },

    register ({commit}, user) {
      return api.users.register(user)
    }
  },
  getters: {
    current: (state) => state.current
  }
}
