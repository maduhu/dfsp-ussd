module.exports = {
  send: function (params) {
    return this.bus.importMethod('identity.check')({
      username: params.system.phone,
      password: params.system.message
    })
    .then((res) => {
      return this.bus.importMethod('transfer.push.execute')({
        sourceIdentifier: params.user.userNumber,
        sourceAccount: params.user.sourceAccount,
        receiver: params.pendingTransaction.receiver,
        destinationAmount: params.pendingTransaction.amount,
        currency: params.pendingTransaction.currencyCode,
        fee: params.pendingTransaction.fee
      })
      .then((result) => {
        params.pendingTransaction.fulfillment = result.fulfillment
        params.pendingTransaction.status = result.status
        return params
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/user/wrongUri')
      })
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/error/wrongPin')
    })
  },
  receive: function (params) {
    return params
  }
}
