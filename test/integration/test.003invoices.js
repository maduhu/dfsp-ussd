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
const AMOUNT = '1242.00'

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
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
      }
    },
    {
      name: 'Pending transactions',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: '3'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object()
        })).error, null, 'Check transactions')
      }
    },
    {
      name: 'Incoming transactions',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: '1'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object()
        })).error, null, 'Check incoming transactions')
      }
    },
    {
      name: 'Return to Home screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object()
        })).error, null, 'Check incoming transactions')
      }
    },
    {
      name: 'sell goods menu',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({}),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on sell goods screen')
      }
    },
    {
      // sell goods screen
      name: 'sell goods menu',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({}),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on sell goods screen')
      }
    },
    {
      // wrong receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: 'fail'
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({}),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({
              code: joi.number(),
              errorPrint: joi.string(),
              print: joi.string(),
              method: joi.string(),
              stackInfo: joi.array(),
              type: joi.string()
            }).unknown()
          }).unknown()
        })).error, null, 'return all params on destination number screen with wrong receiver')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            invoice: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({}),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on sell goods screen')
      }
    }, {
      // enter receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: CUSTOMER.identifier
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on destination number screen')
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
          shortMessage: joi.string().regex(/Wrong Input/),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean(),
              isSignatory: joi.boolean(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on enter invalid amount screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on sell goods screen')
      }
    }, {
      // enter receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: CUSTOMER.phoneNum
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on destination number screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string(),
              destinationAmount: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on enter amount screen')
      }
    },
    {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on sell goods screen')
      }
    }, {
      // enter receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: CUSTOMER.phoneNum
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on destination number screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string(),
              destinationAmount: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on enter amount screen')
      }
    },
    {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on sell goods screen')
      }
    }, {
      // enter receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: CUSTOMER.phoneNum
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on destination number screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string(),
              destinationAmount: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on enter amount screen')
      }
    },
    {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on sell goods screen')
      }
    }, {
      // enter receiver
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: CUSTOMER.phoneNum
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on destination number screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            invoice: joi.object().keys({
              destinationName: joi.string(),
              identifier: joi.string(),
              spspServer: joi.string(),
              destinationAmount: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on enter amount screen')
      }
    },
    {
      name: 'Navigate to home screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            invoice: joi.object(),
            user: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check home screen - ivoices merchant')
      }
    },
    {
      name: 'Pending transactions screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: '3'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            invoice: joi.object(),
            user: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check incoming and outgoing transactions screen')
      }
    },
    {
      name: 'Outgoing transactions screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: '2'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            invoice: joi.object(),
            user: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check outgoing transactions screen')
      }
    },
    {
      name: 'Outgoing transaction - details',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            invoice: joi.object(),
            user: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check outgoing transaction detail')
      }
    },
    {
      name: 'Cancel invoice - merchant',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().valid('Transaction Rejected! \n\n0. Home'),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            invoice: joi.object(),
            user: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check that transaction has been canceled')
      }
    },
    {
      name: 'Navigate to home screen',
      method: 'ussd.request',
      params: {
        phone: MERCHANT.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            invoice: joi.object(),
            user: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check home screen - ivoices merchant')
      }
    },
    {
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
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            pendingTransactions: joi.array().items(joi.object().keys({
              identifier: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceUrl: joi.string(),
              memo: joi.string(),
              status: joi.string().valid('pending')
            })),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on prending transactions screen')
      }
    }, {
      // prending transaction details
      name: 'pending transaction details menu',
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            pendingTransactions: joi.array().items(joi.object().keys({
              identifier: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceUrl: joi.string(),
              memo: joi.string(),
              status: joi.string()
            })),
            pendingTransaction: joi.object().keys({
              account: joi.string(),
              amount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              invoiceId: joi.number(),
              invoiceInfo: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceType: joi.string(),
              merchantIdentifier: joi.string(),
              name: joi.string(),
              receiver: joi.string(),
              status: joi.string(),
              transferCode: joi.string(),
              type: joi.string(),
              quote: joi.object()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on prending transaction details screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            pendingTransaction: joi.object().keys({
              account: joi.string(),
              amount: joi.string(),
              currencyCode: joi.string().valid('TZS').required(),
              currencySymbol: joi.string().valid('TSh').required(),
              invoiceId: joi.number(),
              invoiceInfo: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceType: joi.string(),
              merchantIdentifier: joi.string(),
              name: joi.string().valid(MERCHANT.firstName + ' ' + MERCHANT.lastName).required(),
              receiver: joi.string(),
              fulfillment: joi.any(),
              status: joi.any(),
              transferCode: joi.string(),
              type: joi.string(),
              quote: joi.object()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on verify screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            pendingTransaction: joi.any(),
            pendingTransactions: joi.any()
          }).unknown()
        })).error, null, 'return all params on home screen')
      }
    },
    {
      // prending transactions
      name: 'prending transactions menu',
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            pendingTransactions: joi.array().items(joi.object().keys({
              identifier: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceUrl: joi.string(),
              memo: joi.string(),
              status: joi.string().valid('pending')
            })),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on prending transactions screen')
      }
    },
    {
      // prending transaction details
      name: 'pending transaction details menu',
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            pendingTransactions: joi.array().items(joi.object().keys({
              identifier: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceUrl: joi.string(),
              memo: joi.string(),
              status: joi.string()
            })),
            pendingTransaction: joi.object().keys({
              account: joi.string(),
              amount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              invoiceId: joi.number(),
              invoiceInfo: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceType: joi.string(),
              merchantIdentifier: joi.string(),
              name: joi.string(),
              receiver: joi.string(),
              status: joi.string(),
              transferCode: joi.string(),
              type: joi.string(),
              quote: joi.object()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on prending transaction details screen')
      }
    },
    {
      // prending transactions
      name: 'reject prending transaction',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: SECOND_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().valid('Transaction Rejected! \n\n0. Home'),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string(),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            pendingTransactions: joi.array().items(joi.object().keys({
              identifier: joi.string(),
              invoiceNotificationId: joi.number(),
              invoiceUrl: joi.string(),
              memo: joi.string(),
              status: joi.string().valid('pending')
            })),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'Check transaction has been rejected')
      }
    },
    {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            pendingTransaction: joi.any(),
            pendingTransactions: joi.any()
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({}),
            pendingTransaction: joi.any(),
            pendingTransactions: joi.any()
          }).unknown()
        })).error, null, 'return all params on verify screen')
      }
    },
    {
      name: 'Enter wrong PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            user: joi.object(),
            ministatement: joi.array(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check error screen')
      }
    },
    {
      name: 'Return to enter pin screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '1'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            user: joi.object(),
            ministatement: joi.array(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'Check enter pin screen')
      }
    },
    {
      // verify screen
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            ministatement: joi.array().items(joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            }), joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            }), joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            })),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on ministatement screen')
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
              actorId: joi.string(),
              identifier: joi.string(),
              name: joi.string(),
              accounts: joi.array(),
              sourceAccount: joi.string(),
              currencyCode: joi.string(),
              currencySymbol: joi.string(),
              sourceAccountName: joi.string(),
              sourceAccountNumber: joi.string(),
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on verify pin screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }).unknown(),
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            ministatement: joi.array().items(joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            }), joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            })),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on ministatement screen')
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
