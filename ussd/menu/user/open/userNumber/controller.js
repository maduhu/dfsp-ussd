module.exports = {
  send: function (params) {
    params.open = {}
    return params
  },
  receive: function (params) {
   params.open.number = params.system.message
   return params;
  }
}
