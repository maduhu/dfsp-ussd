module.exports = {
  send: function (params) {
    if (params.transfer.destinationAccount) {
      return params
    }
    return this.bus.importMethod('directory.user.get')({
      URI: params.system.message
    })
    .then((result) => {
      params.transfer.destinationName = result.name
      params.transfer.destinationCurrency = result.currency
      params.transfer.destinationAccount = result.account
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
      params.transfer.destinationAmount = params.system.message
    } else {
      delete params.transfer
    }
    return params
  }
}
