module.exports = {
  send: function (params) {
    var msg = {
      currency: params.cashin.destinationCurrency,
      amount: params.cashin.destinationAmount,
      destinationIdentifier: params.cashin.identifier,
      destinationAccount: params.cashin.destinationAccount,
      spspServer: params.cashin.spspServer,
      sourceAccount: params.user.sourceAccountName,
      sourceIdentifier: params.user.identifier,
      transferType: 'cashIn'
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.cashin.quote = result
        return params
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/user/wrongUri')
      })
  },
  receive: function (params) {
    if (params.system.input.requestParams.proceed) {
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
    } else {
      return params
    }
  }
}
