module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.isDefault = params.system.input.requestParams.isDefault
    return params
  }
}
