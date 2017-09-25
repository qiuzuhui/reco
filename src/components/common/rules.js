/* eslint-disable no-useless-escape */
export default {
  required: (value) => {
    return !!value || '请输入'
  },
  email: (value) => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '请输入正确的邮箱地址'
  },
  number: (value) => {
    return /^\d*$/.test(value) || '请输入数字'
  }
}
