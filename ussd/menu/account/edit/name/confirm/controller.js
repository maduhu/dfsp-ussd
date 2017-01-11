module.exports = {
  send: function (params) {
    if (!params.newAccountName) {
      params.newAccountName = params.system.message
    }
    return params
  },
  receive: function (params) {
    if (params.system.input.requestParams.checkPin) {
      return this.bus.importMethod('identity.check')({
        username: params.system.phone,
        password: params.system.message
      })
      .then((result) => {
        return this.bus.importMethod('ledger.account.edit')({
          accountNumber: params.user.sourceAccountNumber,
          name: params.newAccountName
        })
        .then((res) => {
          return params
        })
      })
      .catch((error) => {
        delete params.newAccountName
        params.context = error
        return this.redirect('menu/error/wrongPin')
      })
    }
    delete params.newAccountName
    return params
  }
}
