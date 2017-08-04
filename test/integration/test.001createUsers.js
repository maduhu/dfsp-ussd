/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER_1 = commonFunc.getCustomer('customer1')
const CUSTOMER_2 = commonFunc.getCustomer('customer2')
const CUSTOMER_3 = commonFunc.getCustomer('customer3')
const CUSTOMER_4 = commonFunc.getCustomer('customer4')
const CUSTOMER_5 = commonFunc.getCustomer('customer5')
const CUSTOMER_6 = commonFunc.getCustomer('customer6')
const CUSTOMER_7 = commonFunc.getCustomer('customer7')
const MERCHANT = commonFunc.getMerchant('merchant')
const AGENT = commonFunc.getAgent('agent')
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
    return run(test, bus, [].concat(
      createUser(CUSTOMER_1),
      createUser(CUSTOMER_2),
      createUser(CUSTOMER_3),
      createUser(CUSTOMER_4),
      createUser(CUSTOMER_5),
      createUser(CUSTOMER_6),
      createUser(CUSTOMER_7),
      createUser(MERCHANT),
      createUser(AGENT)
    ))
  }
}, module.parent)

function createUser (user) {
  return [{
    // home screen
    name: 'Get first menu',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
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
  }, {
    // open an account screen
    name: 'Open an account',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
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
  }, {
    // first name
    name: 'Enter first name',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: user.firstName
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
  }, {
    // last name
    name: 'Enter last name',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: user.lastName
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
  }, {
    // dob
    name: 'Enter dob',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: user.dob
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
  }, {
    // national id
    name: 'Enter national id',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: user.nationalId
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
  }, {
    // account name
    name: 'Enter account name',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: user.accountName
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
  }, {
    // role
    name: 'Enter role',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: user.role
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
  }, {
    // pin
    name: 'Enter PIN',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: user.pin
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
            roleName: joi.string(),
            password: joi.string(),
            result: joi.object().keys({
              account: joi.string(),
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
      }).unknown()).error, null, 'return all params on enter PIN screen')
    }
  }, {
    // account
    name: 'Account created',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: HOME
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
          context: joi.object().keys({}),
          user: joi.object().keys({
            sourceAccount: joi.string()
          }).unknown()
        }).unknown()
      }).unknown()).error, null, 'return all params on account created screen')
    }
  }, {
    name: 'Close session',
    method: 'ussd.closeSession',
    params: {
      phone: user.phoneNum
    },
    result: (result, assert) => {
      assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
    }
  }]
}
