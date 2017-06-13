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
      transferType: 'cashOut'
    }
    return this.bus.importMethod('rule.decision.fetch')(msg)
      .then(result => {
        params.cashin.transferId = result.transferId
        params.cashin.fee = (result.fee && result.fee.amount) || 0
        params.cashin.commission = (result.commission && result.commission.amount) || 0
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
