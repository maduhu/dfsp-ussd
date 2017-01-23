module.exports = {
  beforeSend: function (params) {
    return params
  },
  afterSend: function (params) {
    if (!params.context) {
      params.context = {}
    }
    return params
  },
  beforeReceive: function (params) {
    params.context = {}
    if (!params.system.input) {
      return this.redirect('menu/error/wrongInput')
    }
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
