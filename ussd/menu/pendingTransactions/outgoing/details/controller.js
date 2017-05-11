module.exports = {
  send: function (params) {
    params.pendingTransaction = params.pendingTransactions[params.system.requestParams.index]
    return this.bus.importMethod('transfer.invoicePayer.fetch')({
      invoiceId: params.pendingTransaction.invoiceId
    }).then(function (res) {
      params.pendingTransaction.payers = res
      return params
    })
  },
  receive: function (params) {
    delete params.pendingTransactions
    return params
  }
}
