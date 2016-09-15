module.exports = {
  check: function () {
    return {
      'permission.get': ['*']
    }
  },
  get: function (msg) {
    return {
      actorId: 'user' + msg.userName
    }
  }
}
