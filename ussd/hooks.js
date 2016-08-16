module.exports = {
  beforeSend: function (params) {
    return params
  },
  afterSend: function (params) {
    return params
  },
  beforeReceive: function (params) {
    return params
  },
  afterReceive: function (params) {
    return params
  },
  resume: function (params) {
    return this.redirect({
      href: 'menu/resume',
      params: params
    })
  }
}
