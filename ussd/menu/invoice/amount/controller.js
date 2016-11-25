module.exports = {
  send: function (params) {
    if (params.invoice.destinationAccount) {
      return params
    }
    return this.bus.importMethod('spsp.payee.get')({
      identifier: params.system.message
    })
    .then((result) => {
      params.invoice.destinationName = result.name
      params.invoice.submissionUrl = result.submissionUrl
      params.invoice.destinationUserNumber = params.system.message
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
      params.invoice.destinationAmount = params.system.message
    } else {
      delete params.invoice
    }
    return params
  }
}
