module.exports = {
  id: 'api',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['directory', 'rule', 'transfer', 'account', 'ledger', 'wallet'],
  method: 'post'
}
