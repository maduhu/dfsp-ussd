module.exports = {
  send: function (params) {
    if (params.cashin.destinationAccount) {
      return params
    }
    return this.bus.importMethod('ist.directory.user.get')({
      identifier: params.system.message
    })
    .then((result) => {
      var spspServer = result.directory_details.find((el) => el.primary).providerUrl
      params.cashin.destinationName = result.dfsp_details.name
      params.cashin.destinationCurrency = result.dfsp_details.currencyCode
      params.cashin.destinationAccount = result.dfsp_details.account
      params.cashin.identifier = params.system.message
      params.cashin.spspServer = spspServer
      params.cashin.receiver = spspServer + '/receivers/' + params.system.message
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
