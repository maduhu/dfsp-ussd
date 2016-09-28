module.exports = {
  send: function (params) {
    if (params.sourceAccount) {
      return params
    }
    return this.bus.importMethod('account.account.get')({
      phoneNumber: params.system.phone
    })
    .then((res) => {
      params.sourceAccount = 'http://dfsp1:8014/accounts/' + res.accountId
      return params
    })
    .catch((error) => {
      return this.redirect('menu/user/missingAccount')
    })
  }
}
