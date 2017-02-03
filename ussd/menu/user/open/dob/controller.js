module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    params.open.dob = params.system.message
    return params
  }
}
