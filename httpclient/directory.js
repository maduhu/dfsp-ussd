module.exports = {
  id: 'directory',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8010',
  namespace: ['directory', 'rule', 'transfer'],
  method: 'post'
}
