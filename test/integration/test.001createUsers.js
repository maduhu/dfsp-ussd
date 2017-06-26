/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER_1 = commonFunc.getCustomer('customer1')
const CUSTOMER_2 = commonFunc.getCustomer('customer2')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
            backtrack: joi.array(),
            meta: joi.object(),
            routes: joi.object(),
            message: joi.string(),
            prevState: joi.string(),
            state: joi.string(),
            requestParams: joi.object()
          }),
          user: joi.object().keys({
            sourceAccount: joi.string()
          }).unknown(),
          context: joi.object().keys({}).required()
        }).required()
      }).required()).error, null, 'return all params on home screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object()
        }).required()
      }).required()).error, null, 'return all params on open an account screen')
    }
  }, {
    // Enter your existing user number or skip
    name: 'Skip user number',
    method: 'ussd.request',
    params: {
      phone: user.phoneNum,
      message: FIRST_OPTION
    },
    result: (result, assert) => {
      assert.equals(joi.validate(result, joi.object().keys({
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object()
        }).required()
      }).required()).error, null, 'return all params on open an account screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object()
        }).required()
      }).required()).error, null, 'return all params on enter first name screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object()
        }).required()
      }).required()).error, null, 'return all params on enter last name screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object()
        }).required()
      }).required()).error, null, 'return all params on enter date of bitrh screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object().keys({
            firstName: joi.string().valid(user.firstName).required(),
            lastName: joi.string().valid(user.lastName).required(),
            dob: joi.string().valid(user.dob).required(),
            nationalId: joi.string().valid(user.nationalId).required()
          }).required()
        }).required()
      }).required()).error, null, 'return all params on enter national id screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
            roles: joi.array().required()
          }).required(),
          open: joi.object().keys({
            firstName: joi.string().valid(user.firstName).required(),
            lastName: joi.string().valid(user.lastName).required(),
            dob: joi.string().valid(user.dob).required(),
            nationalId: joi.string().valid(user.nationalId).required(),
            accountName: joi.string().valid(user.accountName).required()
          }).required()
        }).required()
      }).required()).error, null, 'return all params on enter an account name screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object().keys({
            firstName: joi.string().valid(user.firstName).required(),
            lastName: joi.string().valid(user.lastName).required(),
            dob: joi.string().valid(user.dob).required(),
            nationalId: joi.string().valid(user.nationalId).required(),
            accountName: joi.string().valid(user.accountName).required(),
            roleName: joi.string().valid(user.roleName).required()
          }).required()
        }).required()
      }).required()).error, null, 'return all params on enter role screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
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
          context: joi.object().keys({}).required(),
          open: joi.object().keys({
            firstName: joi.string().valid(user.firstName).required(),
            lastName: joi.string().valid(user.lastName).required(),
            dob: joi.string().valid(user.dob).required(),
            nationalId: joi.string().valid(user.nationalId).required(),
            accountName: joi.string().valid(user.accountName).required(),
            roleName: joi.string().valid(user.roleName).required(),
            password: joi.string().valid(user.pin).required(),
            result: joi.object().keys({
              account: joi.string().required(),
              accountName: joi.string().valid(user.accountName).required(),
              accountNumber: joi.string().valid(user.accountName).required(),
              actorId: joi.string().required(),
              currency: joi.string().valid('USD').required(),
              dob: joi.string().valid(user.dob).required(),
              firstName: joi.string().valid(user.firstName).required(),
              identifier: joi.string().required(),
              identifierTypeCode: joi.string().valid('eur').required(),
              lastName: joi.string().valid(user.lastName).required(),
              nationalId: joi.string().valid(user.nationalId).required(),
              password: joi.string().valid(user.pin).required(),
              phoneNumber: joi.string().valid(user.phoneNum).required(),
              roleName: joi.string().valid(user.roleName).required()
            }).required()
          }).required()
        }).required()
      }).required()).error, null, 'return all params on enter PIN screen')
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
        shortMessage: joi.string().required(),
        sourceAddr: joi.string().required().valid(user.phoneNum),
        debug: joi.object().keys({
          system: joi.object().keys({
            expire: joi.string(),
            phone: joi.string().required().valid(user.phoneNum),
            backtrack: joi.array(),
            routes: joi.object(),
            meta: joi.object(),
            message: joi.string(),
            prevState: joi.string(),
            state: joi.string(),
            requestParams: joi.object()
          }),
          context: joi.object().keys({}).required(),
          user: joi.object().keys({
            sourceAccount: joi.string()
          }).unknown()
        }).required()
      }).required()).error, null, 'return all params on account created screen')
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
