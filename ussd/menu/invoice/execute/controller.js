module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoice.add')({
      account: params.user.sourceAccount,
      name: params.invoice.destinationName,
      currencyCode: params.user.currencyCode,
      amount: params.invoice.destinationAmount,
      userNumber: params.invoice.destinationUserNumber,
      dfsp: params.invoice.destinationDfsp,
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
