module.exports = {
  send: function (params) {
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.user.name
    })
    .then((result) => {
      params.user.accountBalance = result.balance
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/error/wrongInput')
    })
  },
  receive: function (params) {
    delete params.user.accountBalance
    return params
  }
}
