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
      return this.bus.importMethod('rule.decision.fetch')({
        currency: invoice.currencyCode,
        amount: Number(invoice.amount)
      })
      .then(result => {
        params.pendingTransaction.fee = result.fee && result.fee.amount || 0
        return this.bus.importMethod('spsp.rule.decision.fetch')({
          currency: invoice.currencyCode,
          amount: Number(invoice.amount),
          identifier: invoice.userNumber
        })
        .then(result => {
          if (result.sourceAmount) {
            params.pendingTransaction.connectorFee = Math.round((result.sourceAmount - Number(invoice.amount)) * 100) / 100
          } else {
            params.pendingTransaction.connectorFee = 0
          }
          return params
        })
        .catch(e => {
          params.pendingTransaction.connectorFee = 0
          return params
        })
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
