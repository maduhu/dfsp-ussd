module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.account.edit')({
      actorId: params.user.actorId,
      accountNumber: params.user.sourceAccountNumber,
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
