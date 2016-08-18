var error = require('./error')
module.exports = {
  id: 'directory',
  createPort: require('ut-port-http'),
  url: 'http://localhost:8011/rpc',
  namespace: ['directory'],
  raw: {
    json: true,
    jar: true,
    strictSSL: false
  },
  parseResponse: false,
  requestTimeout: 300000,
  method: 'post',
  send: function (msg, $meta) {
    return {
      payload: {
        jsonrpc: '2.0',
        id: 1,
        method: $meta.method,
        params: msg
      }
    }
  },
  receive: function (msg, $meta) {
    if ($meta.mtid === 'error') {
      return msg
    }
    if (msg && msg.payload) {
      if (msg.payload.result) {
        return msg.payload.result
      } else if (msg.payload.error) {
        throw msg.payload.error
      }
    }
    throw error.unknown(msg)
  }
}
