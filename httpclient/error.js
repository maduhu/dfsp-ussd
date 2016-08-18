var create = require('ut-error').define

var HttpClient = create('HttpClient')
var UnknownError = create('UnknownError', HttpClient)

module.exports = {
  httpClient: function (cause) {
    return new HttpClient(cause)
  },
  unknown: function (params) {
    return new UnknownError({
      message: 'Unknown HTTP Error',
      params: params
    })
  }
}
