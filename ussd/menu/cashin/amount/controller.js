module.exports = {
  send: function (params) {
    if (params.cashin.destinationAccount) {
      return params
    }
    return this.bus.importMethod('spsp.transfer.payee.get')({
      identifier: params.system.message
    })
    .then((result) => {
      params.cashin.destinationName = result.name
      params.cashin.destinationCurrency = result.currencyCode
      params.cashin.destinationAccount = result.account
      params.cashin.identifier = params.system.message
      params.cashin.receiver = result.spspServer + '/receivers/' + params.system.message
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/user/wrongUri')
    })
  },
  receive: function (params) {
    if (Number.isNaN(parseFloat(params.system.message))) {
      return this.redirect('menu/error/wrongInput')
    }
    if (params.system.input.requestParams.proceed) {
      params.cashin.destinationAmount = params.system.message
    } else {
      delete params.cashin
    }
    return params
  }
}
