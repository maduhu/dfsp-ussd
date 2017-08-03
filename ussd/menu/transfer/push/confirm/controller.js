module.exports = {
  send: function (params) {
    var msg = {
      currency: params.transfer.destinationCurrency,
      amount: params.transfer.destinationAmount,
      destinationIdentifier: params.transfer.identifier,
      destinationAccount: params.transfer.destinationAccount,
      spspServer: params.transfer.spspServer,
      sourceAccount: params.user.sourceAccountName,
      sourceIdentifier: params.user.identifier,
      transferType: 'p2p'
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.transfer.quote = result
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
