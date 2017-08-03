module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoiceNotification.fetch')({
      identifier: params.system.phone,
      status: 'pending'
    }).then(function (res) {
      if (Array.isArray(res) && res.length) {
        params.pendingTransactions = res
      } else {
        delete params.pendingTransactions
      }
      return params
    })
  },
  receive: function (params) {
    return params
  }
}
