module.exports = {
  send: function (params) {
    params.add = {}
    return params
  },
  receive: function (params) {
    if (!params.system.input.requestParams.search) {
      return params
    }
    params.add.userNumber = params.system.message
    return this.bus.importMethod('directory.user.get')({
      userNumber: params.add.userNumber
    })
    .then((res) => {
      params.add.actorId = res.actorId
      return params
    })
    .catch(() => {
      return this.redirect('../addAccount')
    })
  }
}
