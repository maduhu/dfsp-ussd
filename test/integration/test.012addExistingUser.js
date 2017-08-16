/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer5')
const SECOND_CUSTOMER = commonFunc.getCustomer('customer3')
const INIT_MSG = '*123#'
const FIRST_OPTION = '1'
const SECOND_OPTION = '2'
const SEVENTH_OPTION = '7'

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
      name: 'Select manage phone',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SEVENTH_OPTION
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
        })).error, null, 'Select manage phone')
      }
    },
    {
      name: 'Select add user',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FIRST_OPTION
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
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Pin confirmation')
      }
    },
    {
      name: 'Select existing user',
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
        })).error, null, 'Check enter identifier screen')
      }
    },
    {
      name: 'Enter identifier',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SECOND_CUSTOMER.phoneNum
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object(),
            open: joi.object()
          }).unknown()
        })).error, null, 'Check matching user')
      }
    },
    {
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object(),
            open: joi.object().keys({
              firstName: joi.string(),
              lastName: joi.string(),
              dob: joi.string(),
              nationalId: joi.string(),
              accountName: joi.string(),
              number: joi.string(),
              roleName: joi.string(),
              password: joi.string(),
              result: joi.object().keys({
                account: joi.string().required(),
                accountName: joi.string(),
                accountNumber: joi.string(),
                actorId: joi.string(),
                currency: joi.string(),
                dob: joi.string(),
                firstName: joi.string(),
                identifier: joi.string(),
                identifierTypeCode: joi.string(),
                lastName: joi.string(),
                nationalId: joi.string(),
                password: joi.string(),
                phoneNumber: joi.string(),
                roleName: joi.string()
              }).unknown()
            }).unknown()
          }).unknown()
        }).unknown()).error, null, 'Confirm matched user')
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
        message: SECOND_CUSTOMER.pin
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
      name: 'Navigate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '0'
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
      name: 'Select menage phone - again',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SEVENTH_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in manage account screen')
      }
    },
    {
      name: 'Select add user - again',
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
        })).error, null, 'Check info in manage account screen')
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
        })).error, null, 'Pin confirmation')
      }
    },
    {
      name: 'Select existing user',
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
        })).error, null, 'Check enter identifier screen')
      }
    },
    {
      name: 'Enter identifier',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SECOND_CUSTOMER.phoneNum
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object(),
            open: joi.object()
          }).unknown()
        })).error, null, 'Check matching user')
      }
    },
    {
      name: 'Navigate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '0'
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
      name: 'Close session',
      method: 'ussd.closeSession',
      params: {
        phone: CUSTOMER.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    },
    {
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
            subscribers: joi.array(),
            users: joi.array(),
            context: joi.object()
          })
        })).error, null, 'Log user - add account')
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
    }
    ]
    )
  }
}, module.parent)
