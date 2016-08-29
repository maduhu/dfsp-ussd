module.exports = {
  send: function (params) {
    return this.bus.importMethod('directory.user.get')({
      URI: params.system.message
    })
    .then((result) => {
      params.destinationName = result.name
      params.destinationCurrency = result.currency
      params.destinationAccount = result.account
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
    params.destinationAmount = params.system.message
    return params
  }
}
