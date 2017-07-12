/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer6')
const INIT_MSG = '*123#'
const HOME = '0'
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
        })).error, null, 'Check enter account name screen')
      }
    },
    {
      name: 'Enter account name',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: 'new' + commonFunc.generateRandomNumber()
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check primary account question screen')
      }
    },
    {
      name: 'Select to make the account secondary',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check primary account question screen')
      }
    },
    {
      name: 'Enter pin',
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
        })).error, null, 'Check that account has been created')
      }
    },
    {
      name: 'Nagivate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check select account screen')
      }
    },
    {
      name: 'Select newly created account',
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
        })).error, null, 'Check home screen')
      }
    },
    {
      name: 'Select manage account screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check manage account screen')
      }
    },
    {
      name: 'Edit account screen',
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
        })).error, null, 'Check edit options')
      }
    },
    {
      name: 'Select primary account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check options')
      }
    },
    {
      name: 'Enter wrong pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check error pin message')
      }
    },
    {
      name: 'Return to enter pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '1'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Pin confirmation')
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
          shortMessage: joi.string().valid('EDIT ACCOUNT \nCurrent account was set to primary account \n\n0. Home'),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check account confirmation')
      }
    },
    {
      name: 'Nagivate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check select account screen')
      }
    },
    {
      name: 'Select manage account screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check manage account screen')
      }
    },
    {
      name: 'Select close account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().valid('You can not delete your primary account. \n\n0. Home'),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check error message - primary account')
      }
    },
    {
      name: 'Nagivate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check select account screen')
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
