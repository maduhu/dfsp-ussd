module.exports = {
  send: function (params) {
    params.open = {
      number: params.system.phone
    }
    return params
  },
  receive: function (params) {
    params.open.firstName = params.system.message
    return params
  }
}
