module.exports = {
  send: function (params) {
    if (params.sourceAccount) {
      return params
    }
    return this.bus.importMethod('subscription.subscription.get')({
      phoneNumber: params.system.phone
    })
    .then((res) => {
      return this.bus.importMethod('directory.user.get')({
        URI: 'actor:' + res.actorId
      })
    })
    .then((res) => {
      params.name = res.name
      return this.bus.importMethod('ledger.account.get')({
        phoneNumber: params.system.phone
      })
    })
    .then((res) => {
      params.sourceAccount = res.id
      params.currencyCode = res.currencyCode
      params.currencySymbol = res.currencySymbol
      return params
    })
    .catch(() => {
      return this.redirect('menu/user/missingAccount')
    })
  }
}
