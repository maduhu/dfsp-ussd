module.exports = {
  send: function (params) {
    return this.bus.importMethod('ist.directory.user.list')({
      identifier: params.user.identifier
    })
    .then((res) => {
      params.defaultDFSP = res.list.find((el) => el.default)
      if (res.currentDFSP === params.defaultDFSP.shortName) {
        params.dfsp = res.list.filter((el) => !el.default)
      }
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
