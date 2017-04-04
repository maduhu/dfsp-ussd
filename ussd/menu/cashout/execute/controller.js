module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.push.execute')({
      sourceIdentifier: params.cashout.senderIdentifier,
      sourceAccount: params.cashout.senderAccount,
      receiver: params.cashout.receiver,
      destinationAmount: params.cashout.destinationAmount,
      currency: params.cashout.destinationCurrency,
      fee: params.cashout.fee,
      memo: JSON.stringify({
        fee: params.cashout.fee,
        transferCode: 'cashOut',
        debitName: params.cashout.destinationName,
        creditName: params.cashout.senderName
      })
    })
    .then((result) => {
      params.cashout.fulfillment = result.fulfillment
      params.cashout.status = result.status
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  },
  receive: function (params) {
    delete params.cashout
    return params
  }
}
