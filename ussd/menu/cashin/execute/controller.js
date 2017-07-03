module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.push.execute')({
      paymentId: params.cashin.quote.paymentId,
      sourceIdentifier: params.user.identifier,
      sourceAccount: params.user.sourceAccount,
      receiver: params.cashin.receiver,
      destinationAmount: params.cashin.destinationAmount,
      currency: params.cashin.destinationCurrency,
      fee: params.cashin.quote.fee,
      transferType: 'cashIn',
      ipr: params.cashin.quote.ipr,
      sourceExpiryDuration: params.cashin.quote.sourceExpiryDuration,
      connectorAccount: params.cashin.quote.connectorAccount,
      memo: {
        fee: params.cashin.quote.fee,
        commission: params.cashin.quote.commission,
        transferCode: 'cashIn',
        debitName: params.user.name,
        creditName: params.cashin.destinationName
      }
    })
    .then((result) => {
      params.cashin.fulfillment = result.fulfillment
      params.cashin.status = result.status
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  },
  receive: function (params) {
    delete params.cashin
    return params
  }
}
