module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open = {firstName: params.system.message}
    return params
  }
}
