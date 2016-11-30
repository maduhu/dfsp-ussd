module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  logLevel: 'trace',
  url: 'http://localhost:8010',
  namespace: ['directory', 'rule', 'transfer', 'account', 'ledger', 'subscription', 'wallet', 'spsp'],
  logLevel: 'debug',
  method: 'post'
}
