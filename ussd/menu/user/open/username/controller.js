module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.accountName = params.system.message
    return params
  }
}
