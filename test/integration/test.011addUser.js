/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer2')
const USER_TO_ADD_FIRST_NAME = 'firstName' + commonFunc.generateRandomNumber()
const USER_TO_ADD_LAST_NAME = 'lastName' + commonFunc.generateRandomNumber()
const USER_TO_ADD_DOB = '1987-10-10'
const USER_TO_ADD_NATIONAL_ID = commonFunc.generateRandomNumber().toString()
const USER_TO_ADD_ACCOUNT_NAME = commonFunc.generateRandomNumber().toString()
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
      name: 'Select add user',
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
        })).error, null, 'Check info in manage account screen')
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
      name: 'Register new user',
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
        })).error, null, 'Check register new screen')
      }
    },
    {
      name: 'Enter first name',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: USER_TO_ADD_FIRST_NAME
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
          })
        })).error, null, 'Check params on enter first name screen')
      }
    },
    {
      name: 'Enter last name',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: USER_TO_ADD_LAST_NAME
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
            open: joi.object()
          })
        })).error, null, 'Check params on enter last name screen')
      }
    },
    {
      name: 'Enter dob',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: USER_TO_ADD_DOB
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
            open: joi.object()
          })
        })).error, null, 'Check params on enter date of bitrh screen')
      }
    },
    {
      name: 'Enter national id',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: USER_TO_ADD_NATIONAL_ID
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
              number: joi.string(),
              nationalId: joi.string()
            }).unknown()
          }).unknown()
        }).unknown()).error, null, 'Check params on enter national id screen')
      }
    },
    {
      name: 'Enter account name',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: USER_TO_ADD_ACCOUNT_NAME
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
            context: joi.object().keys({
              roles: joi.array()
            }).unknown(),
            open: joi.object().keys({
              firstName: joi.string(),
              lastName: joi.string(),
              dob: joi.string(),
              nationalId: joi.string(),
              number: joi.string(),
              accountName: joi.string()
            }).unknown()
          }).unknown()
        }).unknown()).error, null, 'Check params on enter an account name screen')
      }
    },
    {
      name: 'Enter role',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FIRST_OPTION
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
              roleName: joi.string()
            }).unknown()
          }).unknown()
        }).unknown()).error, null, 'Check params on enter role screen')
      }
    },
    {
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: CUSTOMER.pin
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
        }).unknown()).error, null, 'Check that account has been created')
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
