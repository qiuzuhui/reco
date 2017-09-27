import Memory from '../../api/Memory'

let memory = new Memory({data: []})

export default {
  namespaced: true,
  state: {
    data: memory.data
  },
  mutations: {
    add (type, msg) {
      console.log(type, msg)
      memory.add({
        type: type,
        msg: msg
      })
    }
  },
  actions: {},
  getters: {}
}
