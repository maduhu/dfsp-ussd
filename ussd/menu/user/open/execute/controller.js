module.exports = {
  send: function (params) {
    return this.bus.importMethod('wallet.add')({
      firstName: params.open.firstName,
      lastName: params.open.lastName,
      dob: params.open.dob,
      nationalId: params.open.nationalId,
      phoneNumber: params.system.phone,
      accountName: params.open.accountName,
      password: params.open.password,
      roleName: params.open.roleName
    })
    .then((result) => {
      params.open.result = result
      params.user = {actorId: result.actorId}
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('../error')
    })
  },
  receive: function (params) {
    delete params.open
    return params
  }
}
