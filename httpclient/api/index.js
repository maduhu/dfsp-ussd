module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['directory', 'rule', 'transfer', 'account', 'ledger', 'subscription', 'wallet', 'spsp', 'ist'],
  logLevel: 'debug',
  method: 'post'
}
