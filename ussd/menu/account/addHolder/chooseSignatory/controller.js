module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    if (params.system.input.requestParams.isSignatory === undefined) {
      return params
    }
    params.add.isSignatory = params.system.input.requestParams.isSignatory === '1'
    return params
  }
}
