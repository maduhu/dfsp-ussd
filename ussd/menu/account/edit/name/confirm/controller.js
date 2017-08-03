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
          params.user.accounts = params.user.accounts.map((acc) => {
            if (acc.accountNumber === params.user.sourceAccountNumber) {
              acc.name = params.newAccountName
            }
            return acc
          })
          params.user.sourceAccountName = params.newAccountName
          delete params.newAccountName
          return params
        })
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/error/wrongPin')
      })
    }
    delete params.newAccountName
    return params
  }
}
