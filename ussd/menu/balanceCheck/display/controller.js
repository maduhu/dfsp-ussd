module.exports = {
  send: function (params) {
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((result) => {
      params.user.accountBalance = result.balance
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/error/generic')
    })
  },
  receive: function (params) {
    delete params.user.accountBalance
    return params
  }
}
