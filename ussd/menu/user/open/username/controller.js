module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.username = params.system.message
    return params
  }
}
