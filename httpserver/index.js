var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  imports: ['ussd.start'],
  api: ['ussd'],
  port: 8019,
  allowXFF: true,
  disableXsrf: {
    http: true,
    ws: true
  },
  bundle: 'ussd',
  validationPassThrough: true,
  dist: path.resolve(__dirname, '../dist'),
  routes: {
    rpc: {
      method: '*',
      path: '/rpc/{method?}',
      config: {
        tags: ['rpc'],
        auth: 'basic'
      }
    }
  }
}
