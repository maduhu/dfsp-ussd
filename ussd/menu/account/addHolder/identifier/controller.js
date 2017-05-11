module.exports = {
  send: function (params) {
    params.add = {}
    return params
  },
  receive: function (params) {
    if (!params.system.input.requestParams.search) {
      return params
    }
    params.add.identifier = params.system.message
    return this.bus.importMethod('directory.user.get')({
      identifier: params.add.identifier
    })
    .then((res) => {
      Object.assign(params.add, res)
      return this.bus.importMethod('account.actorAccount.fetch')({
        actorId: '' + res.actorId,
        accountNumber: params.user.sourceAccountNumber
      })
    })
    .then((res) => {
      if (!res.length) {
        return params
      }
      params.context = {errorPrint: 'This user is already a holder to this account'}
      return this.redirect('menu/error/generic')
    })
    .catch((e) => {
      params.context = e
      return this.redirect('menu/error/generic')
    })
  }
}
