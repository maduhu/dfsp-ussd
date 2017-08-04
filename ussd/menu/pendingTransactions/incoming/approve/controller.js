module.exports = {
  send: function (params) {
    return this.bus.importMethod('identity.check')({
      username: params.system.phone,
      password: params.system.message
    })
    .then((res) => {
      return this.bus.importMethod('transfer.push.execute')({
        paymentId: params.pendingTransaction.quote.paymentId,
        sourceIdentifier: params.user.identifier,
        sourceAccount: params.user.sourceAccount,
        receiver: params.pendingTransaction.receiver,
        destinationAmount: params.pendingTransaction.amount,
        currency: params.pendingTransaction.currencyCode,
        fee: params.pendingTransaction.quote.fee,
        transferType: params.pendingTransaction.transferCode,
        ipr: params.pendingTransaction.quote.ipr,
        sourceExpiryDuration: params.pendingTransaction.quote.sourceExpiryDuration,
        connectorAccount: params.pendingTransaction.quote.connectorAccount,
        memo: {
          fee: params.pendingTransaction.quote.fee,
          commission: params.pendingTransaction.quote.commission,
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
    delete params.pendingTransaction
    return params
  }
}
