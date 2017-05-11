module.exports = {
  send: function (params) {
    return this.bus.importMethod('identity.check')({
      username: params.user.identifier,
      password: params.system.message
    })
    .then((res) => {
      return this.bus.importMethod('transfer.push.execute')({
        sourceIdentifier: params.user.identifier,
        sourceAccount: params.user.sourceAccount,
        receiver: params.pendingTransaction.receiver,
        destinationAmount: params.pendingTransaction.amount,
        currency: params.pendingTransaction.currencyCode,
        fee: params.pendingTransaction.fee,
        memo: {
          fee: params.pendingTransaction.fee,
          commission: params.pendingTransaction.commission,
          transferCode: params.pendingTransaction.transferCode,
          debitName: params.user.name,
          creditName: params.pendingTransaction.name
        }
      })
      .then((result) => {
        params.pendingTransaction.fulfillment = result.fulfillment
        params.pendingTransaction.status = result.status
        return this.bus.importMethod('transfer.invoiceNotification.execute')({
          invoiceNotificationId: params.pendingTransaction.invoiceNotificationId
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
