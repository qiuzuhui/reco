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
    login ({commit}, user) {
      return api.users.login(user)
    },

    async current ({commit}) {
      let current = await api.users.current()
      current.balance = await api.balance.balance(current.id)
      commit('setCurrent', current)
      return current
    },

    logout ({commit}) {
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
