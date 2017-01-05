module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.account.edit')({
      actorId: params.user.actorId,
      accountNumber: params.user.sourceAccountNumber,
      isDefault: true
    }).then((res) => {
      return params
    })
  },
  receive: function (params) {
    return params
  }
}
