module.exports = {
  send: function (params) {
    var pendingTransaction = params.pendingTransactions[params.system.requestParams.index]
    return this.bus.importMethod('spsp.transfer.invoice.get')({
      receiver: pendingTransaction.invoiceUrl
    })
    .then((invoice) => {
      params.pendingTransaction = invoice
      params.pendingTransaction.invoiceNotificationId = pendingTransaction.invoiceNotificationId
      params.pendingTransaction.receiver = pendingTransaction.invoiceUrl
      params.pendingTransaction.transferCode = (invoice.invoiceType === 'cashOut' ? 'cashOut' : 'invoice')
      return this.bus.importMethod('rule.decision.fetch')({
        currency: invoice.currencyCode,
        amount: invoice.amount,
        destinationIdentifier: params.pendingTransaction.merchantIdentifier,
        destinationAccount: invoice.account,
        spspServer: pendingTransaction.invoiceUrl.split('/invoices')[0],
        sourceAccount: params.user.sourceAccountName,
        sourceIdentifier: params.user.identifier,
        transferType: params.pendingTransaction.transferCode + '_' + invoice.invoiceId
      })
      .then(result => {
        params.pendingTransaction.quote = result
        return params
      })
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/error/generic')
    })
  },
  receive: function (params) {
    delete params.pendingTransactions
    return params
  }
}
