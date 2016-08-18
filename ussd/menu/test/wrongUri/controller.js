module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    delete params.error
    return params
  }
}
