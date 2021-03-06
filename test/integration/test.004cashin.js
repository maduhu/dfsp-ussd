/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer1')
const AGENT = commonFunc.getAgent('agent')
const INIT_MSG = '*123#'
const FIRST_OPTION = '1'
const SECOND_OPTION = '2'
const HOME = '0'
const MINISTATEMENT = '6'
const AGENT_MINISTATEMENT = '8'
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
        phone: AGENT.phoneNum,
        message: INIT_MSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required()
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on choose account screen')
      }
    }, {
      // choose account
      name: 'Choose account',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // cash in screen
      name: 'Cash in screen',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            cashin: joi.object().required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on cash in screen')
      }
    }, {
      // wrong receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            cashin: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
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
        phone: AGENT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
            cashin: joi.object().keys({}).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // cash in screen
      name: 'Cash in menu',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(SECOND_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            cashin: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
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
        phone: AGENT.phoneNum,
        message: CUSTOMER.firstName
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            cashin: joi.object().keys({
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName),
              identifier: joi.string().required().valid(CUSTOMER.firstName),
              receiver: joi.string().required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
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
        phone: AGENT.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().regex(/Wrong Input/).required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            cashin: joi.object().keys({
              commission: joi.number().valid(0),
              connectorFee: joi.number().valid(1.05),
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName),
              fee: 1,
              identifier: joi.string().required().valid(CUSTOMER.firstName),
              receiver: joi.string().required().valid('http://localhost:8010/receivers/' + CUSTOMER.firstName)
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
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
        phone: AGENT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
            cashin: joi.object().keys({
              commission: joi.number().valid(0),
              connectorFee: joi.number().valid(1.05),
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName),
              fee: 1,
              identifier: joi.string().required().valid(CUSTOMER.firstName),
              receiver: joi.string().required().valid('http://localhost:8010/receivers/' + CUSTOMER.firstName)
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // cash in screen
      name: 'Cash in menu',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(SECOND_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            cashin: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on cash in screen')
      }
    }, {
      // recepient screen
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: CUSTOMER.firstName
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            cashin: joi.object().keys({
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName),
              identifier: joi.string().required().valid(CUSTOMER.firstName),
              receiver: joi.string().required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
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
        phone: AGENT.phoneNum,
        message: AMOUNT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(AMOUNT),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            cashin: joi.object().keys({
              commission: joi.number().valid(0),
              connectorFee: joi.number().valid(1.05),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().required().valid(AMOUNT),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName),
              fee: 1,
              identifier: joi.string().required().valid(CUSTOMER.firstName),
              receiver: joi.string().required().valid('http://localhost:8010/receivers/' + CUSTOMER.firstName)
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(AGENT.firstName),
              name: joi.string().required().valid(AGENT.firstName + ' ' + AGENT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(AGENT.accountName),
              sourceAccountNumber: joi.string().required().valid(AGENT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('cashIn'),
                joi.string().valid('cashOut'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
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
        phone: AGENT.phoneNum,
        message: AGENT.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
            cashin: joi.object().keys({
              commission: joi.number().valid(0),
              connectorFee: joi.number().valid(1.05),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().required().valid(AMOUNT),
              destinationCurrency: joi.string().valid('USD').required(),
              destinationName: joi.string().required().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName),
              fee: 1,
              identifier: joi.string().required().valid(CUSTOMER.firstName),
              receiver: joi.string().required().valid('http://localhost:8010/receivers/' + CUSTOMER.firstName),
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
        phone: AGENT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
        phone: AGENT.phoneNum,
        message: AGENT_MINISTATEMENT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
        phone: AGENT.phoneNum,
        message: AGENT.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(AGENT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(AGENT.phoneNum),
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
            ministatement: joi.array().ordered(joi.object().keys({
              amount: joi.string().valid('-' + AMOUNT).required(),
              date: joi.string().required(),
              name: joi.string().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName).required()
            }).required(), joi.object().keys({
              amount: joi.string().valid('-1.00').required(),
              date: joi.string().required(),
              name: joi.string().valid('fee').required()
            }).required(), joi.object().keys({
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
        phone: AGENT.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }, {
      // home screen
      name: 'Login with customer',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: INIT_MSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER.phoneNum),
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
              identifier: joi.string().required().valid(CUSTOMER.firstName),
              name: joi.string().required().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(CUSTOMER.accountName),
              sourceAccountNumber: joi.string().required().valid(CUSTOMER.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
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
        phone: CUSTOMER.phoneNum,
        message: MINISTATEMENT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER.phoneNum),
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
        }).required()).error, null, 'return all params on verify screen')
      }
    }, {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: CUSTOMER.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(CUSTOMER.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(CUSTOMER.phoneNum),
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
              amount: joi.string().valid(AMOUNT).required(),
              date: joi.string().required(),
              name: joi.string().valid(AGENT.firstName + ' ' + AGENT.lastName).required()
            }).required(), joi.object().keys({
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
        phone: CUSTOMER.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }]
    )
  }
}, module.parent)
