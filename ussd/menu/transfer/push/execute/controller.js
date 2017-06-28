module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.push.execute')({
      paymentId: params.transfer.paymentId,
      sourceIdentifier: params.user.identifier,
      sourceAccount: params.user.sourceAccount,
      receiver: params.transfer.receiver,
      destinationAmount: params.transfer.destinationAmount,
      currency: params.transfer.destinationCurrency,
      fee: params.transfer.fee,
      transferType: 'p2p',
      memo: {
        fee: params.transfer.fee,
        transferCode: 'p2p',
        debitName: params.user.name,
        creditName: params.transfer.destinationName
      }
    })
    .then((result) => {
      params.transfer.fulfillment = result.fulfillment
      params.transfer.status = result.status
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
