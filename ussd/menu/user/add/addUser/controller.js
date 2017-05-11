module.exports = {
  receive: function (params) {
    params.userToAdd = {}
    params.userToAdd.searchedIdentifier = params.system.message
    return params
  }
}
