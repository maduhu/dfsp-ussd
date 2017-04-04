module.exports = {
  send: function (params) {
    return this.bus.importMethod('identity.role.fetch')({
      isPublic: true
    })
    .then((res) => {
      params.context.roles = res
      return params
    })
  },
  receive: function (params) {
    params.open.role = params.system.input.requestParams.name
    return params
  }
}
