module.exports = {
  send: function (params) {
    var msg = {
      currency: params.transfer.destinationCurrency,
      amount: params.transfer.destinationAmount,
      identifier: params.transfer.identifier
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.transfer.fee = result.fee && result.fee.amount || 0
        return this.bus.importMethod('spsp.rule.decision.fetch')(msg)
      })
      .then(result => {
        params.transfer.connectorFee = result.sourceAmount && (result.sourceAmount - msg.amount) || 0
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
