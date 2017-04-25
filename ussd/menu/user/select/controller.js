module.exports = {
  send: function (params) {
    return this.bus.importMethod('directory.user.fetch')({
      actorId: params.subscribers.map((user) => parseInt(user.actorId))
    })
    .then((users) => {
      params.users = users
      return params
    })
  },
  receive: function (params) {
    params.user = {actorId: params.system.input.requestParams.actorId}
    return params
  }
}
