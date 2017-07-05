/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer1')
const INIT_MSG = '*123#'
const FIRST_OPTION = '1'
const SECOND_OPTION = '2'
const THIRD_OPTION = '3'

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
      // add account screen
      name: 'Add account menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in add account screen')
      }
    },
    {
      // enter account name screen
      name: 'Enter account name',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: new Date().toISOString()
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in add account screen')
      }
    },
    {
      name: 'Set primary account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in add account screen')
      }
    },
    {
      name: 'Enter pin to confirm',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: CUSTOMER.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in add account screen')
      }
    }]
    )
  }
}, module.parent)
