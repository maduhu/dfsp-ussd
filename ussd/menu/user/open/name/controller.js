module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.name = params.system.message
    return params
  }
}
