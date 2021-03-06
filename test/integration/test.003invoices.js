/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer1')
const MERCHANT = commonFunc.getMerchant('merchant')
const INIT_MSG = '*123#'
const FIRST_OPTION = '1'
const SECOND_OPTION = '2'
const HOME = '0'
const MINISTATEMENT = '6'
const MERCHANT_MINISTATEMENT = '7'
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
        phone: MERCHANT.phoneNum,
        message: INIT_MSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
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
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
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
      // sell goods screen
      name: 'sell goods menu',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(SECOND_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on sell goods screen')
      }
    }, {
      // wrong receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
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
        phone: MERCHANT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
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
            invoice: joi.object().keys({}).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // sell goods screen
      name: 'sell goods menu',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(SECOND_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on sell goods screen')
      }
    }, {
      // enter receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: CUSTOMER.firstName
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({
              destinationName: joi.string().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName).required(),
              identifier: joi.string().valid(CUSTOMER.firstName).required(),
              spspServer: joi.string().valid('http://localhost:8010').required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
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
      // enter invalid amount
      name: 'Enter invalid amount',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().regex(/Wrong Input/).required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({
              destinationName: joi.string().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName).required(),
              identifier: joi.string().valid(CUSTOMER.firstName).required(),
              spspServer: joi.string().valid('http://localhost:8010').required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on enter invalid amount screen')
      }
    }, {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
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
            invoice: joi.object().keys({
              destinationName: joi.string().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName).required(),
              identifier: joi.string().valid(CUSTOMER.firstName).required(),
              spspServer: joi.string().valid('http://localhost:8010').required()
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // sell goods screen
      name: 'sell goods menu',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(SECOND_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({}).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on sell goods screen')
      }
    }, {
      // enter receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: CUSTOMER.firstName
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({
              destinationName: joi.string().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName).required(),
              identifier: joi.string().valid(CUSTOMER.firstName).required(),
              spspServer: joi.string().valid('http://localhost:8010').required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
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
      // enter amount
      name: 'Enter amount',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: AMOUNT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().regex(/Invoice request sent/).required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            invoice: joi.object().keys({
              destinationName: joi.string().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName).required(),
              identifier: joi.string().valid(CUSTOMER.firstName).required(),
              spspServer: joi.string().valid('http://localhost:8010').required(),
              destinationAmount: joi.string().valid(AMOUNT).required()
            }).required(),
            user: joi.object().keys({
              actorId: joi.string().required(),
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on enter amount screen')
      }
    }, {
      name: 'Close session',
      method: 'ussd.closeSession',
      params: {
        phone: MERCHANT.phoneNum
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
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
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
      // prending transactions
      name: 'prending transactions menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SECOND_OPTION
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
              message: joi.string().valid(SECOND_OPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
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
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            pendingTransactions: joi.array().items(joi.object().keys({
              identifier: joi.string().valid(CUSTOMER.firstName).required(),
              invoiceNotificationId: joi.number().required(),
              invoiceUrl: joi.string().required(),
              memo: joi.string().required(),
              status: joi.string().valid('pending').required()
            })).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on prending transactions screen')
      }
    }, {
      // prending transaction details
      name: 'prending transaction details menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FIRST_OPTION
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
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
                joi.string().valid('invoice'),
                joi.string().valid('ministatement'),
                joi.string().valid('balanceCheck')
              )
            }).required(),
            pendingTransactions: joi.array().items(joi.object().keys({
              identifier: joi.string().valid(CUSTOMER.firstName).required(),
              invoiceNotificationId: joi.number().required(),
              invoiceUrl: joi.string().required(),
              memo: joi.string().required(),
              status: joi.string().valid('pending').required()
            })).required(),
            pendingTransaction: joi.object().keys({
              account: joi.string().valid('http://localhost:8014/ledger/accounts/' + MERCHANT.accountName).required(),
              amount: joi.string().valid(AMOUNT).required(),
              commission: joi.number().valid(0).required(),
              connectorFee: joi.number().valid(1.05).required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              fee: joi.number().valid(1).required(),
              invoiceId: joi.number().required(),
              invoiceInfo: joi.string().required(),
              invoiceNotificationId: joi.number().required(),
              invoiceType: joi.string().valid('standard').required(),
              merchantIdentifier: joi.string().valid(MERCHANT.firstName).required(),
              name: joi.string().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName).required(),
              receiver: joi.string().required(),
              status: joi.string().valid('pending').required(),
              transferCode: joi.string().valid('invoice').required(),
              type: joi.string().valid('invoice').required()
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on prending transaction details screen')
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
            pendingTransaction: joi.object().keys({
              account: joi.string().valid('http://localhost:8014/ledger/accounts/' + MERCHANT.accountName).required(),
              amount: joi.string().valid(AMOUNT).required(),
              commission: joi.number().valid(0).required(),
              connectorFee: joi.number().valid(1.05).required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              fee: joi.number().valid(1).required(),
              fulfillment: joi.string().valid('oCKAINnWMdlw8Vpvz8jMBdIOguJls1lMo6kBT6ERSrh11MDK').required(),
              invoiceId: joi.number().required(),
              invoiceInfo: joi.string().required(),
              invoiceNotificationId: joi.number().required(),
              invoiceType: joi.string().valid('standard').required(),
              merchantIdentifier: joi.string().valid(MERCHANT.firstName).required(),
              name: joi.string().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName).required(),
              receiver: joi.string().required(),
              status: joi.string().valid('executed').required(),
              transferCode: joi.string().valid('invoice').required(),
              type: joi.string().valid('invoice').required()
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
        phone: CUSTOMER.phoneNum,
        message: HOME
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
              amount: joi.string().valid('-' + AMOUNT).required(),
              date: joi.string().required(),
              name: joi.string().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName).required()
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
        phone: CUSTOMER.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }, {
      // home screen
      name: 'Login with merchant',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: INIT_MSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
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
              identifier: joi.string().required().valid(MERCHANT.firstName),
              name: joi.string().required().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName),
              accounts: joi.array().required(),
              sourceAccount: joi.string().required(),
              currencyCode: joi.string().valid('USD').required(),
              currencySymbol: joi.string().valid('$').required(),
              sourceAccountName: joi.string().required().valid(MERCHANT.accountName),
              sourceAccountNumber: joi.string().required().valid(MERCHANT.accountName),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string().required(),
              permissions: joi.array().required().items(
                joi.string().valid('p2p'),
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
      // go to ministatement screen
      name: 'Ministatement screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: MERCHANT_MINISTATEMENT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
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
        phone: MERCHANT.phoneNum,
        message: MERCHANT.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(MERCHANT.phoneNum),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(MERCHANT.phoneNum),
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
              name: joi.string().valid(CUSTOMER.firstName + ' ' + CUSTOMER.lastName).required()
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
        phone: MERCHANT.phoneNum
      },
      result: (result, assert) => {
        assert.true(result.shortMessage.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }]
    )
  }
}, module.parent)
