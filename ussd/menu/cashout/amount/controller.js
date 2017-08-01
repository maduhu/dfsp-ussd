module.exports = {
  send: function (params) {
    if (params.cashOut.destinationAccount) {
      return params
    }
    return this.bus.importMethod('ist.directory.user.get')({
      identifier: params.system.message
    })
    .then((result) => {
      params.cashOut.destinationName = result.dfsp_details.name
      params.cashOut.spspServer = result.directory_details.find((el) => el.primary).providerUrl
      params.cashOut.identifier = params.system.message
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
      params.cashOut.destinationAmount = params.system.message
    } else {
      delete params.cashOut
    }
    return params
  }
}
