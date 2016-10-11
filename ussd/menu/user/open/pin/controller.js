module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.password = params.system.message
    return params
  }
}
