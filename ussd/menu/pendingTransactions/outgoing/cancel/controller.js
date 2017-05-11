module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoice.cancel')({
      invoiceId: params.pendingTransaction.invoiceId,
      identifier: params.user.identifier
    })
    .then(result => params)
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  },
  receive: function (params) {
    return params
  }
}
