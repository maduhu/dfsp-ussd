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
        phone: CUSTOMER_1.phoneNum,
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
              isDefault: joi.boolean(),
              isSignatory: joi.boolean(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({})
          })
        })).error, null, 'return all params on home screen')
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
            transfer: joi.object().keys({}),
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({})
          })
        })).error, null, 'return all params on send money screen')
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
            transfer: joi.object().keys({}),
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
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
          })
        })).error, null, 'return all params on destination number screen with wrong receiver')
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
            transfer: joi.object().keys({}),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
            transfer: joi.object().keys({}),
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object().keys({})
          })
        })).error, null, 'return all params on send money screen')
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
            transfer: joi.object().keys({
              spspServer: joi.string(),
              destinationAccount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string()
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          })
        })).error, null, 'return all params on destination number screen')
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
            transfer: joi.object().keys({
              spspServer: joi.string(),
              destinationAccount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              fee: joi.number().optional(),
              commission: joi.number().optional(),
              identifier: joi.string(),
              receiver: joi.string()
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          })
        })).error, null, 'return all params on amount screen')
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
            transfer: joi.object().keys({
              spspServer: joi.string(),
              destinationAccount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              fee: joi.number().optional(),
              identifier: joi.string(),
              receiver: joi.string()
            }).unknown(),
            context: joi.object()
          })
        })).error, null, 'return all params on home screen')
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
            transfer: joi.object(),
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          })
        })).error, null, 'return all params on send money screen')
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
            transfer: joi.object().keys({
              spspServer: joi.string(),
              destinationAccount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string()
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          })
        })).error, null, 'return all params on destination number screen')
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
            transfer: joi.object().keys({
              spspServer: joi.string(),
              destinationAccount: joi.string(),
              destinationAmount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string(),
              quote: joi.object()
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          })
        })).error, null, 'return all params on amount screen')
      }
    },
    {
      // verify screen
      name: 'Enter wrong PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          sourceAddr: joi.string(),
          debug: joi.object()
        })).error, null, 'Check error message - wrong pin')
      }
    },
    {
      name: 'Return to enter correct pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: '1'
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
        })).error, null, 'return all params on home screen')
      }
    },
    {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
        message: CUSTOMER_1.pin
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
            transfer: joi.object().keys({
              spspServer: joi.string(),
              destinationAccount: joi.string(),
              destinationAmount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              status: joi.any(),
              fulfillment: joi.any(),
              receiver: joi.string(),
              quote: joi.object()
            }).unknown(),
            context: joi.object()
          })
        })).error, null, 'return all params on verify screen')
      }
    },
    {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER_1.phoneNum,
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
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on home screen')
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
        phone: CUSTOMER_1.phoneNum,
        message: CUSTOMER_1.pin
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
              amount: joi.string().required(),
              date: joi.string().required(),
              name: joi.string().required()
            })),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on ministatement screen')
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
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on home screen')
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
        phone: CUSTOMER_2.phoneNum,
        message: CUSTOMER_2.pin
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
            })),
            context: joi.object().keys({})
          }).unknown()
        })).error, null, 'return all params on ministatement screen')
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
