module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.push.execute')({
      sourceAccount: params.sourceAccount,
      destinationAccount: params.destinationAccount,
      destinationAmount: params.destinationAmount,
      currency: params.destinationCurrency,
      fee: params.fee
    })
    .then((result) => {
      params.fulfillment = result.fulfillment
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  }
}
