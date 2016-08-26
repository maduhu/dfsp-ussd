module.exports = {
  send: function (params) {
    return this.bus.importMethod('rule.decision.fetch')({
      currency: params.destinationCurrency,
      amount: params.destinationAmount
    })
    .then((result) => {
      params.fee = result.fee && result.fee.amount
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  }
}
