module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.nationalId = params.system.message
    return params
  }
}
