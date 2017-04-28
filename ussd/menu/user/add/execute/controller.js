module.exports = {
  send: function (params) {
    return this.bus.importMethod('subscription.subscription.add')({
      actorId: '' + params.userToAdd.actorId,
      phoneNumber: params.system.phone
    })
      .then((user) => {
        return params
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/error')
      })
  },
  receive: function (params) {
    return params
  }
}
