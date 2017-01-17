var userHelper = require('../../../userHelper')
module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.system.input.requestParams.accountNumber
    })
    .then((res) => {
      var accountNumber = params.system.input.requestParams.accountNumber
      params.user.sourceAccount = res.id
      params.user.currencyCode = res.currencyCode
      params.user.currencySymbol = res.currencySymbol
      params.user.sourceAccountNumber = accountNumber
      params.user.sourceAccountName = res.name
      params.user.isDefault = userHelper.isDefaultAccount(params.user.accounts, accountNumber)
      return params
    })
  }
}
