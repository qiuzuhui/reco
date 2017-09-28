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
    },
    setData (state, data) {
      state.data = data
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
    },

    async fetch ({commit}) {
      let users = await api.users.fetch()
      commit('setData', users)
    }

  },
  getters: {
    current: (state) => state.current,
    all: (state) => state.data
  }
}
