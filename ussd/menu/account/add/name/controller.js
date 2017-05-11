module.exports = {
  send: function (params) {
    params.open = {}
    return params
  },
  receive: function (params) {
    params.open.name = params.system.message
    if (!params.user.accounts) {
      params.open.isDefault = true
      return this.redirect('../pin')
    }
    return params
  }
}
