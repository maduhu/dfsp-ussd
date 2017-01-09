module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.account.get')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((account) => {
      if (account.isDefault) {
        return this.redirect('./forbidden/primary')
      }
      return this.bus.importMethod('ledger.account.get')({
        accountNumber: params.user.sourceAccountNumber
      })
      .then((account) => {
        if (false && Number(account.balance) > 0) {
          return this.redirect('./forbidden/balance')
        }
        return params
      })
    })
    .catch(() => {
      return this.redirect('menu/error/generic')
    })
  },
  receive: function (params) {
    if (params.system.input.requestParams.checkPin) {
      return this.bus.importMethod('identity.check')({
        username: params.system.phone,
        password: params.system.message
      })
      .then((result) => {
        return params
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/error/wrongPin')
      })
    }
    return params
  }
}
