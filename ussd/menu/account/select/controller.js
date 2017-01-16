module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.system.input.requestParams.accountNumber
    })
    .then((res) => {
      params.user.sourceAccount = res.id
      params.user.currencyCode = res.currencyCode
      params.user.currencySymbol = res.currencySymbol
      params.user.sourceAccountNumber = params.system.input.requestParams.accountNumber
      params.user.sourceAccountName = res.name
      params.user.isDefault = params.user.accounts.filter((acc) => acc.accountNumber === params.user.sourceAccountNumber)[0].isDefault
      return params
    })
  }
}
