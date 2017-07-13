var userHelper = require('../../../userHelper')
module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.actorAccount.fetch')({
      actorId: params.user.actorId
    })
      .then((r) => {
        return this.bus.importMethod('ledger.account.fetch')({
          accountNumber: r.map((el) => el.accountNumber)
        })
          .then((res) => {
            params.user.accounts = userHelper.setAccountsStatus(r, res)
            params.user.availableAccounts = params.user.accounts.filter((acc) => acc.accountNumber !== params.user.sourceAccountNumber)
            return params
          })
          .catch(() => params)
      })
  },
  receive: function (params) {
    if (!params.system.input.requestParams.accountNumber) {
      return params
    }
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.system.input.requestParams.accountNumber
    })
    .then((res) => {
      params = userHelper.setUserParams(res, params.system.input.requestParams.accountNumber, params)
      delete params.user.availableAccounts
      return params
    })
  }
}
