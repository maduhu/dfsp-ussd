/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer4')
const INIT_MSG = '*123#'
const THIRD_OPTION = '3'
const FOURTH_OPTION = '4'

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
      // home screen
      name: 'Login',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: INIT_MSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            user: joi.object(),
            context: joi.object()
          })
        })).error, null, 'Log user - add account')
      }
    },
    {
      // manage account screen
      name: 'Manage account menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            user: joi.object(),
            context: joi.object()
          }),
          sourceAddr: joi.any()
        })).error, null, 'Check info in manage account screen')
      }
    },
    {
      name: 'Account info',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FOURTH_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in edit account screen')
      }
    },
    {
      name: 'Close session',
      method: 'ussd.closeSession',
      params: {
        phone: CUSTOMER.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }]
    )
  }
}, module.parent)
