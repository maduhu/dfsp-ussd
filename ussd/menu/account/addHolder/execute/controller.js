module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.account.add')({
      actorId: '' + params.add.actorId,
      accountNumber: params.user.sourceAccountNumber,
      isDefault: false,
      isSignatory: params.add.isSignatory
    })
    .then((res) => {
      delete params.add
      return params
    })
  },
  receive: function (params) {
    return params
  }
}
