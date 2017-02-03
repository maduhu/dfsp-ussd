module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.lastName = params.system.message
    return params
  }
}
