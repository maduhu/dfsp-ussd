module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoice.reject')({
      invoiceId: params.pendingTransaction.invoiceId
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
