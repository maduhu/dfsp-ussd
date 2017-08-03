/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')

const USER_TO_ADD_NEGATIVE = {
  phoneNum: '1' + commonFunc.generateRandomNumber().toString().slice(-8),
  firstName: 'firstName' + commonFunc.generateRandomNumber(),
  lastName: 'lastName' + commonFunc.generateRandomNumber(),
  dob: 'fail',
  nationalId: commonFunc.generateRandomNumber().toString(),
  accountName: commonFunc.generateRandomNumber().toString(),
  role: '1',
  roleName: 'customer',
  identifier: commonFunc.generateRandomNumber().toString(),
  pin: '1234'
}

const INIT_MSG = '*123#'
const FIRST_OPTION = '1'
const HOME = '0'

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
      name: 'Get first menu',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: INIT_MSG
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
              meta: joi.object(),
              routes: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        }).unknown()).error, null, 'return all params on home screen')
      }
    },
    {
      name: 'Open an account',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
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
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            open: joi.object()
          }).unknown()
        }).unknown()).error, null, 'return all params on open an account screen')
      }
    },
    {
      // first name
      name: 'Enter first name',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: USER_TO_ADD_NEGATIVE.firstName
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
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            open: joi.object()
          }).unknown()
        }).unknown()).error, null, 'return all params on enter first name screen')
      }
    },
    {
      name: 'Enter last name',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: USER_TO_ADD_NEGATIVE.lastName
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
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            open: joi.object()
          }).unknown()
        }).unknown()).error, null, 'return all params on enter last name screen')
      }
    },
    {
      name: 'Enter dob',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: USER_TO_ADD_NEGATIVE.dob
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
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            open: joi.object()
          }).unknown()
        }).unknown()).error, null, 'return all params on enter date of bitrh screen')
      }
    },
    {
      name: 'Enter national id',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: USER_TO_ADD_NEGATIVE.nationalId
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
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            open: joi.object().keys({
              firstName: joi.string(),
              lastName: joi.string(),
              dob: joi.string(),
              number: joi.string(),
              nationalId: joi.string()
            }).unknown()
          }).unknown()
        }).unknown()).error, null, 'return all params on enter national id screen')
      }
    },
    {
      name: 'Enter account name',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: USER_TO_ADD_NEGATIVE.accountName
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
            }).unknown(),
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
        }).unknown()).error, null, 'return all params on enter an account name screen')
      }
    },
    {
      name: 'Enter role',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: USER_TO_ADD_NEGATIVE.role
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
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
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
        }).unknown()).error, null, 'return all params on enter role screen')
      }
    },
    {
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: USER_TO_ADD_NEGATIVE.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().valid('Account opening failed: \ninvalid input syntax for type date: "fail"\n\n0. Home'),
          sourceAddr: joi.string(),
          debug: joi.object()
        }).unknown()).error, null, 'Check error message')
      }
    },
    {
      name: 'Account created',
      method: 'ussd.request',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object()
        }).unknown()).error, null, 'Check home screen')
      }
    },
    {
      name: 'Close session',
      method: 'ussd.closeSession',
      params: {
        phone: USER_TO_ADD_NEGATIVE.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }]
    )
  }
}, module.parent)
