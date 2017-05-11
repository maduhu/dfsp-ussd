module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.actorAccount.fetch')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((res) => {
      return this.bus.importMethod('directory.user.fetch')({
        actorId: res.map((el) => parseInt(el.actorId))
      })
      .then((r) => {
        params.context = {
          holders: r
        }
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
      })
    })
    .catch((err) => {
      params.context = err
      return this.redirect('menu/error/generic')
    })
  },
  receive: function (params) {
    return params
  }
}
