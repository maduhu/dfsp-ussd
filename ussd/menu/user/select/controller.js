module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    return this.bus.importMethod('todo/user.get')({
      phoneNumber: ''
    })
    .then((users) => {
      params.users = users
      return params
    })
  }
}
