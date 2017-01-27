module.exports = {
  send: function (params) {
    params.add = {isDefault: false}
    return params
  },
  receive: function (params) {
    if (!params.system.input.requestParams.proceed) {
      return params
    }
    return this.bus.importMethod('spsp.transfer.payee.get')({
      identifier: params.system.message
    })
    .then((res) => {
      return this.bus.importMethod('wallet.add')({
        userNumber: params.add.userNumber,
        name: res.name,
        phoneNumber: params.system.message
      })
      .then((result) => {
        params.add.actorId = result.actorId
        params.add.isDefault = true
        return params
      })
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/error/generic')
    })
  }
}
