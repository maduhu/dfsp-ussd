/* eslint no-process-env: 0 */
module.exports = {
  server: require('../../server'),
  serverConfig: require('../../server/' + (process.env.UT_ENV || 'test')),
  client: require('../client'),
  clientConfig: require('../client/test'),
  peerImplementations: [
    require('dfsp-directory/index_test'),
    require('dfsp-rule/index_test'),
    require('dfsp-transfer/index_test'),
    require('dfsp-api/index_test'),
    require('dfsp-identity/index_test'),
    require('dfsp-account/index_test'),
    require('dfsp-subscription/index_test'),
    require('dfsp-ledger/index_test')
  ]
}
