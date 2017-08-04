var userHelper = require('../../../userHelper')
module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.actorAccount.get')({
      actorAccountId: params.user.actorAccountId
    })
    .then((account) => {
      if (account.isDefault) {
        return this.redirect('./forbidden/primary')
      }
      return this.bus.importMethod('ledger.account.get')({
        accountNumber: params.user.sourceAccountNumber
      })
      .then((account) => {
        if (Number(account.balance) > 0) {
          return this.redirect('./forbidden/balance')
        }
        return params
      })
    })
    .catch(() => {
      return this.redirect('menu/error/generic')
    })
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
            isDisabled: true
          })
            .then(() => {
              return this.bus.importMethod('account.actorAccount.fetch')({
                actorId: params.user.actorId
              })
                .then((r) => {
                  return this.bus.importMethod('ledger.account.fetch')({
                    accountNumber: r.map((el) => el.accountNumber)
                  })
                    .then((res) => {
                      params.user.accounts = userHelper.setAccountsStatus(r, res)
                      if (res.length === 1) {
                        var accountNumber = res[0].accountNumber
                        return this.bus.importMethod('ledger.account.get')({
                          accountNumber: accountNumber
                        }).then((result) => {
                          return userHelper.setUserParams(result, accountNumber, params)
                        })
                      } else if (res.length > 1) {
                        params.context.message = 'Your account ' + params.user.sourceAccountName + ' was successfully closed.'
                        return this.redirect('menu/account/select')
                      }
                      return params
                    })
                })
            })
            .catch(() => {
              return this.redirect('menu/error/generic')
            })
        })
        .catch((error) => {
          params.context = error
          return this.redirect('menu/error/wrongPin')
        })
    }
    return params
  }
}
