module.exports = {
  send: function (params) {
    params.dfsp = params.system.requestParams.dfsp
    return this.bus.importMethod('ist.directory.user.change')({
      identifier: params.user.identifier,
      dfsp: params.dfsp
    })
    .then((res) => {
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/error/generic')
    })
  },
  receive: function (params) {
    return params
  }
}
