module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.invoice.add')({
      account: params.user.sourceAccount,
      name: params.user.name,
      currencyCode: params.user.currencyCode,
      currencySymbol: params.user.currencySymbol,
      amount: params.cashOut.destinationAmount,
      identifier: params.cashOut.identifier,
      merchantIdentifier: params.user.identifier,
      spspServer: params.cashOut.spspServer,
      invoiceType: 'cashOut',
      invoiceInfo: 'Cashout request from ' + params.user.name + ' for ' + params.cashOut.destinationAmount + ' ' + params.user.currencyCode
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
    delete params.cashOut
    return params
  }
}
