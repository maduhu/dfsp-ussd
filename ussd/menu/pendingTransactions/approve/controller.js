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
        memo: JSON.stringify({
          fee: params.pendingTransaction.fee,
          transferCode: 'invoice'
        })
      })
      .then((result) => {
        params.pendingTransaction.fulfillment = result.fulfillment
        params.pendingTransaction.status = result.status
        return this.bus.importMethod('transfer.invoiceNotification.edit')({
          invoiceNotificationId: params.pendingTransaction.invoiceNotificationId,
          statusCode: 'e'
        })
      })
      .then((result) => params)
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
