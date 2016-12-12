module.exports = {
  id: 'identity',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8012',
  namespace: ['identity'],
  logLevel: 'debug',
  method: 'post'
}
