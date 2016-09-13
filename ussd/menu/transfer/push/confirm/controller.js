module.exports = {
  send: function (params) {
    return this.bus.importMethod('rule.decision.fetch')({
      currency: params.transfer.destinationCurrency,
      amount: params.transfer.destinationAmount
    })
    .then((result) => {
      params.transfer.fee = (result.fee && result.fee.amount) || 0
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  }
}
