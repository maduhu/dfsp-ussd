module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open = {}
    return params
  }
}
