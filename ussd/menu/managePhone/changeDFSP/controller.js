module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    if (params.system.input.requestParams.proceed) {
      return this.bus.importMethod('identity.check')({
        username: params.system.phone,
        password: params.system.message
      })
      .then((result) => {
        return this.bus.importMethod('ist.directory.user.setPrimaryDFPS')({
          identifier: params.system.phone
        })
        .then(() => params)
        .catch(() => {
          return this.redirect('menu/error/generic')
        })
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/error/wrongPin')
      })
    } else {
      return params
    }
  }
}
