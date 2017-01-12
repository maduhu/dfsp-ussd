module.exports = {
  send: function (params) {
    params.user.availableAccounts = params.user.accounts.filter((acc) => acc.accountNumber !== params.user.sourceAccountNumber)
    return params
  },
  receive: function (params) {
    if (!params.system.input.requestParams.accountNumber) {
      return params
    }
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.system.input.requestParams.accountNumber
    })
    .then((res) => {
      params.user.sourceAccount = res.id
      params.user.currencyCode = res.currencyCode
      params.user.currencySymbol = res.currencySymbol
      params.user.sourceAccountNumber = params.system.input.requestParams.accountNumber
      params.user.sourceAccountName = res.name
      delete params.user.availableAccounts
      return params
    })
  }
}
