module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    return this.bus.importMethod('identity.add')({
      hash: {
        actorId: params.user.actorId,
        identifier: params.user.name,
        type: 'password',
        password: params.system.message
      }
    })
    .then((res) => {
      return this.redirect('menu/home')
    })
  }
}
