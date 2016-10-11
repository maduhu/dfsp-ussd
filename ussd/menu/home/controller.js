module.exports = {
  send: function (params) {
    if (params.sourceAccount) {
      return params
    }
    return this.bus.importMethod('ledger.account.get')({
      phoneNumber: params.system.phone
    })
    .then((res) => {
      params.sourceAccount = res.id
      return params
    })
    .catch(() => {
      return this.redirect('menu/user/missingAccount')
    })
  }
}
