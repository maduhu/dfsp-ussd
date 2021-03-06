module.exports = {
  send: function (params) {
    var msg = {
      currency: params.transfer.destinationCurrency,
      amount: params.transfer.destinationAmount,
      destinationIdentifier: params.transfer.identifier,
      destinationAccount: params.transfer.destinationAccount,
      sourceAccount: params.user.sourceAccountName,
      sourceIdentifier: params.user.identifier,
      transferType: 'p2p'
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.transfer.fee = (result.fee && result.fee.amount) || 0
        params.transfer.connectorFee = result.connectorFee
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
        username: params.user.identifier,
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
