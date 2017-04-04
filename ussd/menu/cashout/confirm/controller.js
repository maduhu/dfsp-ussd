module.exports = {
  send: function (params) {
    var msg = {
      currency: params.cashout.destinationCurrency,
      amount: params.cashout.destinationAmount,
      identifier: params.cashout.identifier
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.cashout.fee = (result.fee && result.fee.amount) || 0
        return this.bus.importMethod('spsp.rule.decision.fetch')(msg)
          .then(result => {
            if (result.sourceAmount) {
              params.cashout.connectorFee = Math.round((result.sourceAmount - msg.amount) * 100) / 100
            } else {
              params.cashout.connectorFee = 0
            }
            return params
          })
          .catch(e => {
            params.cashout.connectorFee = 0
            return params
          })
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
