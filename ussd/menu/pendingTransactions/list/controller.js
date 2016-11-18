module.exports = {
  send: function (params) {
    if (params.pendingTransactions) {
      return params
    }
    return this.bus.importMethod('transfer.invoiceNotification.fetch')({
      userNumber: params.user.userNumber
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
