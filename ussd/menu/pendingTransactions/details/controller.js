module.exports = {
  send: function (params) {
    // use params.system.requestParams.invoiceNotificationId to fetch invice info
    // return this.bus.importMethod('transfer.invoiceNotification.get')({

    // })
    return this.bus.importMethod('spsp.invoice.get')({
      url: params.system.requestParams.invoiceUrl
    }).then((result) => {
      params.pendingTransaction = result
      params.pendingTransaction.fee = 0
      return params
    })
  },
  receive: function (params) {
    return params
  }
}
