import Memory from '../../api/Memory'

let memory = new Memory({data: []})

export default {
  namespaced: true,
  state: {
    data: memory.data
  },
  mutations: {
    add (state, data) {
      memory.add({
        id: Date.now(),
        type: data.type,
        msg: data.msg
      })
    },
    remove (state, id) {
      memory.remove(id)
    }
  },
  actions: {},
  getters: {
    all: (state) => state.data
  }
}
