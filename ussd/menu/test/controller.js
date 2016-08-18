module.exports = {
  send: function (params) {
    delete params.result
    delete params.error
    return this.bus.importMethod('directory.user.get')({
      URI: params.system.message
    })
    .then(result => {
      params.result = result
      return params
    })
    .catch((error) => {
      params.error = error
      return this.redirect('./wrongUri')
    })
  },
  receive: function (params) {
    delete params.result
    return params
  }
}
