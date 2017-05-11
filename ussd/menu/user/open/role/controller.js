module.exports = {
  send: function (params) {
    return this.bus.importMethod('account.role.fetch')({
      isPublic: true
    })
    .then((res) => {
      params.context.roles = res
      return params
    })
  },
  receive: function (params) {
    params.open.roleName = params.system.input.requestParams.name
    return params
  }
}
