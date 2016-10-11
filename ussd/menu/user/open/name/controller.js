module.exports = {
  send: function (params) {
    params.open = {}
    return params
  },
  receive: function (params) {
    params.open.name = params.system.message
    return params
  }
}
