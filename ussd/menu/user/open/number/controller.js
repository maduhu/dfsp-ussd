module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.number = params.system.message
    return params
  }
}
