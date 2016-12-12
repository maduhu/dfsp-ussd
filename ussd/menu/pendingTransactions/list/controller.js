module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoiceNotification.fetch')({
      userNumber: params.user.userNumber,
      statusCode: 'p'
    }).then(function (res) {
      if (Array.isArray(res) && res.length) {
        params.pendingTransactions = res
      }
      return params
    })
  },
  receive: function (params) {
    delete params.pendingTransactions
    return params
  }
}
