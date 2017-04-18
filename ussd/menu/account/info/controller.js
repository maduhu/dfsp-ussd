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
        params.context = {
          holders: r.map((el) => ({
            name: el.firstName + ' ' + el.lastName,
            isSignatory: res.filter((acc) => acc.actorId === '' + el.actorId)[0].isSignatory
          }))
        }
        return params
      })
    })
    .catch((err) => {
      params.context = err
      return this.redirect('menu/error/generic')
    })
  }
}
