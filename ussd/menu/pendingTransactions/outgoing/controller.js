module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoice.fetch')({
      merchantIdentifier: params.user.identifier,
      account: params.user.sourceAccount,
      status: ['pending'],
      invoiceType: ['standard', 'pending', 'product', 'cashOut']
    }).then(function (res) {
      if (Array.isArray(res) && res.length) {
        params.pendingTransactions = res
      }
      return params
    })
  },
  receive: function (params) {
    return params
  }
}
