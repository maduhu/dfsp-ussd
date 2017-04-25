module.exports = {
  send: function (params) {
    return this.bus.importMethod('directory.user.get')({
      identifier: params.userToAdd.identifier
    })
      .then((user) => {
        if (!user.actorId) {
          params.userToAdd = {}
          return params
        } else {
          return this.bus.importMethod('subscription.subscription.fetch')({
            actorId: '' + user.actorId,
            phoneNumber: params.system.phone
          })
            .then((result) => {
              if (!result[0].actorId) {
                params.userToAdd = user
                return params
              } else {
                params.userToAdd.exist = true
                return params
              }
            })
        }
      })
      .catch(() => {
        params.userToAdd = {}
        return params
      })
  },
  receive: function (params) {
    return params
  }
}
