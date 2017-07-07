/* eslint no-console: 0 */
var test = require('ut-run/test')
const request = require('supertest')('http://localhost:8010')
var config = require('./../lib/appConfig')
var joi = require('joi')

test({
  type: 'integration',
  name: 'Ussd service',
  server: config.server,
  serverConfig: config.serverConfig,
  client: config.client,
  clientConfig: config.clientConfig,
  peerImplementations: config.peerImplementations,
  steps: function (test, bus, run) {
    return run(test, bus, [{
      name: 'Post samples',
      params: (context) => {
        return request
          .post('/samples')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Basic ' + new Buffer('dfsp1-test' + ':' + 'dfsp1-test').toString('base64'))
          .expect(200)
          .send({})
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          body: joi.array()
        }).unknown()).error, null, 'Check posted samples')
      }
    }]
    )
  }
}, module.parent)
