var userHelper = require('../../userHelper')
module.exports = {
  send: function (params) {
    if (!params.user) {
      params.user = {}
    } else if (params.user.sourceAccount) {
      return params
    }
    if (!params.user.actorId) {
      return this.bus.importMethod('subscription.subscription.fetch')({
        phoneNumber: params.system.phone
      })
      .then((subRes) => {
        if (subRes.length > 1) {
          params.subscribers = subRes
          return this.redirect('menu/user/select')
        }
        params.user.actorId = subRes[0].actorId
      })
    } else {
      return this.bus.importMethod('directory.user.get')({
        actorId: params.user.actorId
      })
        .then((res) => {
          params.user.identifier = res.identifiers[0].identifier
          params.user.name = res.firstName + ' ' + res.lastName
          return this.bus.importMethod('identity.get')({
            actorId: params.user.actorId,
            type: 'password'
          })
          .then((r) => {
            if (!r.hashParams || r.hashParams.length === 0) {
              return this.redirect('menu/user/missingPin')
            }
            return params
          })
        })
        .then((res) => {
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
                })
                .then((result) => {
                  params = userHelper.setUserParams(result, accountNumber, params)
                  return params
                })
              } else if (res.length > 1) {
                return this.redirect('menu/account/select')
              }
              return params
            })
            .catch(() => params)
          })
        })
      .catch(() => {
        return this.redirect('menu/user/missingAccount')
      })
    }
  }
}
