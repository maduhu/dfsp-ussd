module.exports = {
  send: function (params) {
    params.open = {}
    return params
  },
  receive: function (params) {
    if (!params.system.input.requestParams.skip) {
      params.open.number = params.system.message
    }
    return params
  }
}
