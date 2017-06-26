module.exports = {
  send: function (params) {
    return this.bus.importMethod('transfer.push.execute')({
      transferId: params.cashin.transferId,
      sourceIdentifier: params.user.identifier,
      sourceAccount: params.user.sourceAccount,
      receiver: params.cashin.receiver,
      destinationAmount: params.cashin.destinationAmount,
      currency: params.cashin.destinationCurrency,
      fee: params.cashin.fee,
      transferType: 'cashIn',
      memo: {
        fee: params.cashin.fee,
        commission: params.cashin.commission,
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
