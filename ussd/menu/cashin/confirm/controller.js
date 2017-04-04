module.exports = {
  send: function (params) {
    var msg = {
      currency: params.cashin.destinationCurrency,
      amount: params.cashin.destinationAmount,
      identifier: params.cashin.identifier
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.cashin.fee = (result.fee && result.fee.amount) || 0
        return this.bus.importMethod('spsp.rule.decision.fetch')(msg)
          .then(result => {
            if (result.sourceAmount) {
              params.cashin.connectorFee = Math.round((result.sourceAmount - msg.amount) * 100) / 100
            } else {
              params.cashin.connectorFee = 0
            }
            return params
          })
          .catch(e => {
            params.cashin.connectorFee = 0
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
