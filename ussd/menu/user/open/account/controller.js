module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.account = params.system.message
    return params
  }
}
