module.exports = {
  send: function (params) {
    return this.bus.importMethod('wallet.add')({
      userNumber: params.open.number,
      name: params.open.name,
      phoneNumber: params.system.phone,
      accountNumber: params.open.account,
      password: params.open.password
    })
    .then((result) => {
      params.open.result = result
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('../error')
    })
  },
  receive: function (params) {
    delete params.open
    return params
  }
}
