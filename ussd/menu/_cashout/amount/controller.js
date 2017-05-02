module.exports = {
  send: function (params) {
    if (params.cashout.account) {
      return params
    }
    return this.bus.importMethod('spsp.transfer.payee.get')({
      identifier: params.user.identifier
    })
    .then((result) => {
      params.cashout.destinationName = result.name
      params.cashout.destinationCurrency = result.currencyCode
      params.cashout.destinationAccount = result.account
      params.cashout.identifier = params.user.identifier
      params.cashout.receiver = result.spspServer + '/receivers/' + params.user.identifier
      return this.bus.importMethod('spsp.transfer.payee.get')({
        identifier: params.system.message
      })
      .then((result) => {
        params.cashout.senderName = result.name
        params.cashout.senderAccount = result.account
        params.cashout.senderIdentifier = params.system.message
        return params
      })
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  },
  receive: function (params) {
    if (Number.isNaN(parseFloat(params.system.message))) {
      return this.redirect('menu/error/wrongInput')
    }
    if (params.system.input.requestParams.proceed) {
      params.cashout.destinationAmount = params.system.message
    } else {
      delete params.cashout
    }
    return params
  }
}
