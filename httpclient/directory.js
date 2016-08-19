var port = require('ut-port-jsonrpc')
port.id = 'directory'
port.namespace = ['directory']
port.url = 'http://localhost:8011'
port.method = 'post'
module.exports = port
