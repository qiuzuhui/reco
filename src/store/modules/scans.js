import scans from '../../api/mock/scans'

export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    setData (state, data) {
      state.data = data
    }
  },
  actions: {
    async add ({dispatch, commit}, scan) {
      await scans.add(scan)
      await dispatch('reFetch')
    },
    async reFetch ({dispatch, commit}) {
      let data = await scans.fetch()
      commit('setData', data)
      return data
    },
    async remove ({dispatch, commit}, id) {
      await scans.remove(id)
      await dispatch('reFetch')
    },
    async update ({dispatch, commit}, id) {
      await scans.update(id)
      await dispatch('reFetch')
    }
  },
  getters: {
    all: (state) => state.data
  }
}
