module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    delete params.newAccountName
    return params
  }
}
