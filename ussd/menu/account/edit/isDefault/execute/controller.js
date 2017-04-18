module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.actorAccount.edit')({
      actorAccountId: params.user.actorAccountId,
      isDefault: true
    }).then((res) => {
      params.user.isDefault = true
      params.user.accounts = params.user.accounts.map((acc) => {
        acc.accountNumber === params.user.sourceAccountNumber ? acc.isDefault = true : acc.isDefault = false
        return acc
      })
      return params
    })
  },
  receive: function (params) {
    return params
  }
}
