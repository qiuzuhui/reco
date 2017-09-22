import _ from 'lodash'

let data = [{
  'id': 0,
  'benacoScasnId': 'string',
  'description': 'demo',
  'type': '0',
  'status': '0',
  'createTime': '2017-09-22T01:25:47.473Z',
  'updateTime': '2017-09-22T01:25:47.473Z'
}]

export default {
  fetch () {
    return new Promise(function (resolve, reject) {
      resolve(_.clone(data))
    })
  },
  add (scan) {
    return new Promise(function (resolve, reject) {
      resolve(data.push(scan))
    })
  },
  async remove (id) {
    let index = await this.getIndex(id)
    return data.slice(index, 1)
  },
  get (id) {
    return new Promise(function (resolve, reject) {
      resolve(data.filter((item) => item.id === id)[0])
    })
  },
  async getIndex (id) {
    let item = await this.get(id)
    return data.indexOf(item)
  },
  async update (data) {
    let index = await this.getIndex(data.id)
    return data.slice(index, 1, data)
  }

}
