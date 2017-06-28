/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER_1 = commonFunc.getCustomer('customer1')
const CUSTOMER_2 = commonFunc.getCustomer('customer2')
const INIT_MSG = '*123#'
const FIRST_OPTION = '1'
const HOME = '0'
const MINISTATEMENT = '6'
const AMOUNT = '42.00'

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
        phone: CUSTOMER_1.phoneNum,
        message: INIT_MSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              meta: joi.object(),
              routes: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required().valid(CUSTOMER_1.firstName + ' ' + CUSTOMER_1.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // send money screen
      name: 'Send money menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRST_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required().valid(CUSTOMER_1.firstName + ' ' + CUSTOMER_1.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // wrong receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({
              code: joi.number().valid(-1).required(),
              errorPrint: joi.string().required(),
              print: joi.string(),
              method: joi.string().required(),
              stackInfo: joi.array().required(),
              type: joi.string().valid('dfsp.spsp.noaccount').required()
            }).required()
          }).required()
        }).required()).error, null, 'return all params on destination number screen with wrong receiver')
      }
    }, {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            transfer: joi.object().keys({}).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // send money screen
      name: 'Send money menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRST_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // recepient screen
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: CUSTOMER_2.identifier
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({
              spspServer: joi.string().required(),
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required(),
              identifier: joi.string().required(),
              receiver: joi.string().required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on destination number screen')
      }
    }, {
      // amount screen
      name: 'Enter wrong amount',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().regex(/Wrong Input/).required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({
              spspServer: joi.string().required(),
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required(),
              fee: joi.number().optional(),
              commission: joi.number().optional(),
              identifier: joi.string().required(),
              receiver: joi.string().required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            transfer: joi.object().keys({
              spspServer: joi.string().required(),
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER_2.firstName + ' ' + CUSTOMER_2.lastName),
              fee: joi.number().optional(),
              identifier: joi.string().required(),
              receiver: joi.string().required()
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // send money screen
      name: 'Send money menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRST_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // recepient screen
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: CUSTOMER_2.identifier
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({
              spspServer: joi.string().required(),
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required(),
              identifier: joi.string().required(),
              receiver: joi.string().required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on destination number screen')
      }
    }, {
      // amount screen
      name: 'Enter amount',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: AMOUNT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(AMOUNT),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            transfer: joi.object().keys({
              spspServer: joi.string().required(),
              paymentId: joi.string().required(),
              commission: joi.number().optional(),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().required().valid(AMOUNT),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER_2.firstName + ' ' + CUSTOMER_2.lastName),
              fee: joi.number().optional(),
              identifier: joi.string().required(),
              receiver: joi.string().required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_1.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_1.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: CUSTOMER_1.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            transfer: joi.object().keys({
              spspServer: joi.string().required(),
              paymentId: joi.string().required(),
              commission: joi.number().optional(),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().required().valid(AMOUNT),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required(),
              fee: joi.number().optional(),
              identifier: joi.string().required(),
              receiver: joi.string().required(),
              fulfillment: joi.string().required().valid('oCKAINnWMdlw8Vpvz8jMBdIOguJls1lMo6kBT6ERSrh11MDK'),
              status: joi.string().required().valid('executed')
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on verify screen')
      }
    }, {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // go to ministatement screen
      name: 'Ministatement screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: MINISTATEMENT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on verify pin screen')
      }
    }, {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: CUSTOMER_1.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_1.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_1.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            ministatement: joi.array().items(joi.object().keys({
              amount: joi.string().required(),
              date: joi.string().required(),
              name: joi.string().required()
            })),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on ministatement screen')
      }
    }, {
      name: 'Close session',
      method: 'ussd.closeSession',
      params: {
        phone: CUSTOMER_1.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }, {
      // home screen
      name: 'Login with customer 2',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_2.phoneNum,
        message: INIT_MSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_2.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_2.phoneNum),
              backtrack: joi.array(),
              meta: joi.object(),
              routes: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required(),
              name: joi.string().required(),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER_2.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER_2.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              sourceAccountType: joi.string().required(),
              permissions: joi.array().required().items(joi.string().valid('p2p'), joi.string().valid('ministatement'), joi.string().valid('balanceCheck'))
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // go to ministatement screen
      name: 'Ministatement screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_2.phoneNum,
        message: MINISTATEMENT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_2.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_2.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on verify pin screen')
      }
    }, {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_2.phoneNum,
        message: CUSTOMER_2.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER_2.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER_2.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            ministatement: joi.array().items(joi.object().keys({
              amount: joi.string().required(),
              date: joi.string().required(),
              name: joi.string().required()
            })),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on ministatement screen')
      }
    }, {
      name: 'Close session',
      method: 'ussd.closeSession',
      params: {
        phone: CUSTOMER_2.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }]
    )
  }
}, module.parent)
