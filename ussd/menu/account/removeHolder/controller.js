module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.account.fetch')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((res) => {
      return this.bus.importMethod('directory.user.fetch')({
        actorId: res.map((el) => parseInt(el.actorId))
      })
      .then((r) => {
        params.context = {
          holders: r.map((el) => ({name: el.name, actorId: el.actorId}))
        }
        return params
      })
    })
  },
  receive: function (params) {
    params.remove = {actorId: params.system.input.requestParams.holderActorId}
    return this.bus.importMethod('account.account.fetch')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((res) => {
      var signatoryUsers = res.filter((el) => el.isSignatory)
      if (signatoryUsers.length === 1 && signatoryUsers[0].actorId === params.remove.actorId) {
        return this.redirect('./error')
      }
      return params
    })
  }
}
