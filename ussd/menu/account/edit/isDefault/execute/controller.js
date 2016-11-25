module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.account.edit')({
      actorId: params.user.actorId,
      accountNumber: params.user.sourceAccountNumber,
      isDefault: true
    }).then((res) => {
      
    }).catch((err) => {
      var x = 1
    })
  },
  receive: function (params) {
    return params
  }
}
