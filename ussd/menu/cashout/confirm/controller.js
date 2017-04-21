module.exports = {
  send: function (params) {
    var msg = {
      currency: params.cashout.destinationCurrency,
      amount: params.cashout.destinationAmount,
      destinationIdentifier: params.cashout.identifier,
      destinationAccount: params.cashout.destinationAccount,
      sourceAccount: params.user.sourceAccountName,
      sourceIdentifier: params.user.identifier,
      transferType: 'cashOut'
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.cashout.fee = (result.fee && result.fee.amount) || 0
        params.cashout.connectorFee = result.connectorFee
        params.cashout.commission = (result.commission && result.commission.amount) || 0
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
        username: params.cashout.senderIdentifier,
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
