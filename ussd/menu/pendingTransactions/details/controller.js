module.exports = {
  send: function (params) {
    var pendingTransaction = params.pendingTransactions[params.system.requestParams.index]
    return this.bus.importMethod('spsp.transfer.invoice.get')({
      receiver: pendingTransaction.invoiceUrl
    }).then((result) => {
      params.pendingTransaction = result
      params.pendingTransaction.invoiceNotificationId = pendingTransaction.invoiceNotificationId
      params.pendingTransaction.fee = 0
      params.pendingTransaction.receiver = pendingTransaction.invoiceUrl
      return params
    })
  },
  receive: function (params) {
    delete params.pendingTransactions
    return params
  }
}
