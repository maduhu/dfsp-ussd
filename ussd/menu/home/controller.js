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
      return this.bus.importMethod('directory.user.get')({
        actorId: res.actorId
      })
    })
    .then((res) => {
      params.user.userNumber = res.endUserNumber
      params.user.name = res.name
      return this.bus.importMethod('ledger.account.get')({
        phoneNumber: params.system.phone
      })
    })
    .then((res) => {
      params.user.sourceAccount = res.id
      params.user.currencyCode = res.currencyCode
      params.user.currencySymbol = res.currencySymbol
      return params
    })
    .catch(() => {
      return this.redirect('menu/user/missingAccount')
    })
  }
}
