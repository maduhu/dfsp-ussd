module.exports = {
  send: function (params) {
    return this.bus.importMethod('ledger.account.add')({
      balance: 1000,
      name: params.open.name
    })
    .then((res) => {
      return this.bus.importMethod('account.account.add')({
        actorId: params.user.actorId,
        accountNumber: res.accountNumber,
        isDefault: params.open.isDefault,
        isSignatory: true
      })
    })
  },
  receive: function (params) {
    return params
  }
}
