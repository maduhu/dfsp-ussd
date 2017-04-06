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
        return params
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
