module.exports = {
  ports: [{
    id: 'jsonrpc',
    headers: {
      Authorization: 'Basic ' + new Buffer('dfsp1-test' + ':' + 'dfsp1-test').toString('base64')
    },
    createPort: require('ut-port-jsonrpc')
  }],
  modules: {}
}
