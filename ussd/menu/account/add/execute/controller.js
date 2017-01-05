module.exports = {
  send: function (params) {
    return this.bus.importMethod('ledger.account.edit')({
      accountNumber: params.open.name,
      balance: 1000,
      name: params.open.name
    })
    .then((res) => {
      return this.bus.importMethod('account.account.add')({
        actorId: params.user.actorId,
        accountNumber: params.open.name,
        isDefault: params.open.isDefault
      })
    })
  },
  receive: function (params) {
    return params
  }
}
