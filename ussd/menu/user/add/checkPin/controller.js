module.exports = {
  receive: function (params) {
    if (params.system.input.requestParams.checkPin) {
      return this.bus.importMethod('identity.check')({
        username: params.user.identifier,
        password: params.system.message
      })
      .then((result) => {
        return params
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/error/wrongPin')
      })
    }
    return params
  }
}
