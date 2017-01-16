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
      .then((r) => {
        return this.bus.importMethod('ledger.account.fetch')({
          accountNumber: r.map((el) => el.accountNumber)
        })
        .then((res) => {
          params.user.accounts = res.map((led) => {
            led.isDefault = r.filter((acc) => { return acc.accountNumber === led.accountNumber })[0].isDefault
            return led
          })
          if (res.length === 1) {
            var accountNumber = res[0].accountNumber
            return this.bus.importMethod('ledger.account.get')({
              accountNumber: accountNumber
            }).then((res) => {
              params.user.sourceAccount = res.id
              params.user.currencyCode = res.currencyCode
              params.user.currencySymbol = res.currencySymbol
              params.user.sourceAccountName = res.name
              params.user.sourceAccountNumber = accountNumber
              params.user.isDefault = params.user.accounts.filter((acc) => acc.accountNumber === params.user.sourceAccountNumber)[0].isDefault
              return params
            })
          } else if (res.length > 1) {
            return this.redirect('menu/account/select')
          }
          return params
        })
      })
    })
    .catch(() => {
      return this.redirect('menu/user/missingAccount')
    })
  }
}
