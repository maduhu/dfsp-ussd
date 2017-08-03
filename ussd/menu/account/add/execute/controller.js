module.exports = {
  send: function (params) {
    return this.bus.importMethod('ledger.account.add')({
      balance: 100000,
      name: params.open.name
    })
    .then((res) => {
      return this.bus.importMethod('account.actorAccount.add')({
        actorId: params.user.actorId,
        accountNumber: res.accountNumber,
        isDefault: params.open.isDefault,
        isSignatory: true
      })
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
