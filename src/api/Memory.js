import _ from 'lodash'

export default class {
  constructor (args) {
    this.data = args.data
    this.idProperty = args.idProperty || 'id'
  }

  fetch () {
    return new Promise((resolve, reject) => {
      resolve(_.clone(this.data))
    })
  }

  add (scan) {
    return this.update(scan)
  }

  async remove (id) {
    let index = await this.getIndex(id)
    return this.data.splice(index, 1)
  }

  get (id) {
    return new Promise((resolve, reject) => {
      resolve(this.data.filter((item) => item[this.idProperty] === id)[0])
    })
  }

  async getIndex (id) {
    let item = await this.get(id)
    return this.data.indexOf(item)
  }

  async update (data) {
    let index = await this.getIndex(data[this.idProperty])
    if (index < 0) {
      return this.data.push(data)
    } else {
      return this.data.splice(index, 1, data)
    }
  }
}
