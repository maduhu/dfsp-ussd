module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.push.execute')({
      sourceAccount: params.transfer.sourceAccount,
      destinationAccount: params.transfer.destinationAccount,
      destinationAmount: params.transfer.destinationAmount,
      currency: params.transfer.destinationCurrency,
      fee: params.transfer.fee
    })
    .then((result) => {
      params.transfer.fulfillment = result.fulfillment
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  },
  receive: function (params) {
    delete params.transfer
    return params
  }
}
