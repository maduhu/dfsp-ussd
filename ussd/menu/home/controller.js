module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    return this.bus.importMethod('directory.user.get')({
      URI: params.system.message
    })
    .then((result) => {
      params.context = result
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('../user/wrongUri')
    })
  }
}
