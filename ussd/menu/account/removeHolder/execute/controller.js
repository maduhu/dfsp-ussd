module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.actorAccount.remove')({
      accountNumber: params.user.actorAccountId
    })
    .then((result) => {
      var actorId = params.remove.actorId
      delete params.remove
      return this.bus.importMethod('account.actorAccount.fetch')({
        actorId: actorId
      })
      .then((accounts) => {
        if (accounts.length === 0) {
          return params
        }
        return this.bus.importMethod('ledger.account.fetch')({
          accountNumber: accounts.map((el) => el.accountNumber)
        })
        .then((ledgers) => {
          var primaryAccount = accounts.filter((el) => el.isDefault)
          if (primaryAccount.length < 1 && ledgers.length > 0) {
            return this.bus.importMethod('account.actorAccount.edit')({
              actorAccountId: primaryAccount.actorAccountId,
              isDefault: true
            })
          }
          return params
        })
      })
    })
    .catch((error) => {
      delete params.remove
      params.context = error
      return this.redirect('menu/error/generic')
    })
  }
}
