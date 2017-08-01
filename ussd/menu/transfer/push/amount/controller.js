module.exports = {
  send: function (params) {
    if (params.transfer.destinationAccount) {
      return params
    }
    return this.bus.importMethod('ist.directory.user.get')({
      identifier: params.system.message
    })
    .then((result) => {
      var spspServer = result.directory_details.find((el) => el.primary).providerUrl
      params.transfer.destinationName = result.dfsp_details.name
      params.transfer.destinationCurrency = result.dfsp_details.currencyCode
      params.transfer.destinationAccount = result.dfsp_details.account
      params.transfer.identifier = params.system.message
      params.transfer.spspServer = spspServer
      params.transfer.receiver = spspServer + '/receivers/' + params.system.message
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
