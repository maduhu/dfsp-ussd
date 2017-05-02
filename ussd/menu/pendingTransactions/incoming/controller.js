module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoiceNotification.fetch')({
      identifier: params.user.identifier,
      status: 'pending'
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
