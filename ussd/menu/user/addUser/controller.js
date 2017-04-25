module.exports = {
  receive: function (params) {
    params.userToAdd = {}
    params.userToAdd.identifier = params.system.message
    return params
  }
}
