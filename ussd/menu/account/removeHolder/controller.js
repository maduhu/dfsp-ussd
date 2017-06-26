module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.actorAccount.fetch')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((res) => {
      return this.bus.importMethod('directory.user.fetch')({
        actorId: res.map((el) => parseInt(el.actorId))
      })
      .then((r) => {
        params.holders = res.map((el) => {
          var user = r.find((e) => ('' + e.actorId) === el.actorId)
          return {
            name: user.firstName + ' ' + user.lastName,
            actorId: el.actorId,
            actorAccountId: el.actorAccountId
          }
        })
        return params
      })
    })
    .catch((err) => {
      params.context = err
      return this.redirect('menu/error/generic')
    })
  },
  receive: function (params) {
    params.remove = params.holders[params.system.input.requestParams.account]
    return this.bus.importMethod('account.actorAccount.fetch')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((res) => {
      var signatoryUsers = res.filter((el) => el.isSignatory)
      if (signatoryUsers.length === 1 && signatoryUsers[0].actorId === params.remove.actorId) {
        params.context = {errorPrint: 'The account must have at least one signatory holder!'}
        return this.redirect('menu/error/generic')
      }
      return params
    })
  }
}
