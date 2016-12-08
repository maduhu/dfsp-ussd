module.exports = {
  send: function (params) {
    // use params.system.requestParams.invoiceNotificationId to fetch invice info
    // return this.bus.importMethod('transfer.invoiceNotification.get')({

    // })
    return this.bus.importMethod('spsp.transfer.invoice.get')({
      receiver: params.system.requestParams.invoiceUrl
    }).then((result) => {
      params.pendingTransaction = result
      params.pendingTransaction.fee = 0
      params.pendingTransaction.receiver = params.system.requestParams.invoiceUrl
      return params
    })
  },
  receive: function (params) {
    return params
  }
}
