module.exports = {
  send: function (params) {
    if (!params.user) {
      params.user = {}
    } else if (params.user.sourceAccount) {
      return params
    }
    return this.bus.importMethod('subscription.subscription.get')({
      phoneNumber: params.system.phone
    })
    .then((res) => {
      params.user.actorId = res.actorId
      return this.bus.importMethod('directory.user.get')({
        actorId: res.actorId
      })
    })
    .then((res) => {
      params.user.userNumber = res.endUserNumber
      params.user.name = res.name
      return this.bus.importMethod('account.account.fetch')({
        actorId: params.user.actorId
      })
    })
    .then((res) => {
      params.user.accounts = res
      if (res.length === 1) {
        var accountNumber = res[0].accountNumber
        return this.bus.importMethod('ledger.account.get')({
          accountNumber: accountNumber
        }).then((res) => {
          params.user.sourceAccount = res.id
          params.user.currencyCode = res.currencyCode
          params.user.currencySymbol = res.currencySymbol
          params.user.sourceAccountNumber = accountNumber
          return params
        })
      } else if (res.length > 1) {
        return this.redirect('menu/account/select')
      }
      return params
    })
    .catch(() => {
      return this.redirect('menu/user/missingAccount')
    })
  }
}
