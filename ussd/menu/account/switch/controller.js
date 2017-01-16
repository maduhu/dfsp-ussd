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
      params.user.isDefault = params.user.accounts.filter((acc) => { return acc.accountNumber === params.user.sourceAccountNumber })[0].isDefault
      delete params.user.availableAccounts
      return params
    })
  }
}
