module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    if (params.system.input.requestParams.proceed) {
      params.open.number = params.system.message
    }
    return params
  }
}
