module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['directory', 'rule', 'transfer', 'account', 'ledger', 'subscription', 'wallet', 'spsp', 'identity', 'ist'],
  logLevel: 'debug',
  method: 'post',
  send: function (msg, $meta) {
    return {
      uri: '/rpc/' + $meta.method,
      payload: {
        id: 1,
        jsonrpc: '2.0',
        method: $meta.method,
        params: msg
      }
    }
  }
}
