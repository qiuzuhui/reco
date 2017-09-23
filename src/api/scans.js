import _ from 'lodash'

let data = [{
  'id': 38,
  'reviewId': 'bd790f40-1a00-4aa8-9f16-cb751d0c7328',
  'title': '黄昏沙漠',
  'thumbnail': '/static/demo-data/paris.jpeg',
  'status': '0',
  'createTime': 'Sat Sep 23 2017 21:37:48 GMT+0800 (CST)'
}, {
  'id': 39,
  'reviewId': 'ddaad9ef-7d0d-4e8a-98a0-45e6aa8b8a15',
  'title': '午夜幽魂',
  'thumbnail': '/static/demo-data/nest.jpg',
  'status': '0',
  'createTime': 'Sat Sep 23 2017 21:37:40 GMT+0800 (CST)'
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
