module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.system.input.requestParams.accountNumber
    }).then(function(res) {
      params.user.sourceAccount = res.id
      params.user.currencyCode = res.currencyCode
      params.user.currencySymbol = res.currencySymbol
      return params
    })
  }
}
