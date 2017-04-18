module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoice.add')({
      account: params.user.sourceAccount,
      name: params.user.name,
      currencyCode: params.user.currencyCode,
      currencySymbol: params.user.currencySymbol,
      amount: params.invoice.destinationAmount,
      identifier: params.invoice.identifier,
      merchantIdentifier: params.user.identifier,
      spspServer: params.invoice.spspServer,
      invoiceInfo: 'Invoice from ' + params.user.name + ' for ' + params.invoice.destinationAmount + ' ' + params.user.currencyCode
    })
    .then((result) => {
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  },
  receive: function (params) {
    delete params.invoice
    return params
  }
}
