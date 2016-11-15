module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.rule.fetch')({
      currency: params.transfer.destinationCurrency,
      amount: params.transfer.destinationAmount,
      receiver: params.transfer.destinationAccount
    })
    .then((result) => {
      params.transfer.fee = (result.fee && result.fee.amount) || 0
      params.transfer.connectorFee = result.connectorFee || 0
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
