module.exports = {
  send: function (params) {
    return this.bus.importMethod('wallet.add')({
      identifier: params.system.phone,
      identifierTypeCode: 'phn',
      firstName: params.open.firstName,
      lastName: params.open.lastName,
      dob: params.open.dob,
      nationalId: params.open.nationalId,
      phoneNumber: params.system.phone,
      accountName: params.open.account,
      password: params.open.password
    })
    .then((result) => {
      params.open.result = result
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
