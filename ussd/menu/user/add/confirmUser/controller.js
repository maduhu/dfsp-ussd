module.exports = {
  send: function (params) {
    var searchedIdentifier = params.userToAdd.searchedIdentifier
    return this.bus.importMethod('directory.user.get')({
      identifier: searchedIdentifier
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
              if (!result.length) {
                params.userToAdd = user
                params.userToAdd.searchedIdentifier = searchedIdentifier
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
