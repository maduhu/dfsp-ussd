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
        amount: Number(invoice.amount),
        destinationIdentifier: params.pendingTransaction.identifier,
        destinationAccount: params.pendingTransaction.receiver,
        sourceAccount: params.user.sourceAccountName,
        sourceIdentifier: params.user.identifier,
        transferType: params.pendingTransaction.transferCode
      })
      .then(result => {
        params.pendingTransaction.fee = (result.fee && result.fee.amount) || 0
        params.pendingTransaction.commission = (result.commission && result.commission.amount) || 0
        params.pendingTransaction.connectorFee = result.connectorFee
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
