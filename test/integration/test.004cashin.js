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
        phone: AGENT.phoneNum,
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
              accounts: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on choose account screen')
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
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on home screen')
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
            cashin: joi.object(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on cash in screen')
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
            cashin: joi.object().keys({}),
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
        phone: AGENT.phoneNum,
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
            cashin: joi.object().keys({}),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on home screen')
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
            cashin: joi.object().keys({}),
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
        })).error, null, 'return all params on send money screen')
      }
    }, {
      // recepient screen
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
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
            cashin: joi.object().keys({
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string(),
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
      // amount screen
      name: 'Enter wrong amount',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
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
            cashin: joi.object().keys({
              destinationAccount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string(),
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
        })).error, null, 'return all params on amount screen')
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
            cashin: joi.object().keys({
              commission: joi.number(),
              destinationAccount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              fee: 1,
              identifier: joi.string(),
              receiver: joi.string(),
              spspServer: joi.string()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on home screen')
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
            cashin: joi.object().keys({}),
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
        })).error, null, 'return all params on cash in screen')
      }
    }, {
      // recepient screen
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
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
            cashin: joi.object().keys({
              destinationAccount: joi.string().required(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string(),
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
      // amount screen
      name: 'Enter amount',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
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
            cashin: joi.object().keys({
              destinationAccount: joi.string(),
              destinationAmount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string(),
              spspServer: joi.string(),
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
              sourceAccountType: joi.string(),
              isDefault: joi.boolean().truthy(),
              isSignatory: joi.boolean().truthy(),
              actorAccountId: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on amount screen')
      }
    }, {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
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
            user: joi.object().keys({
              sourceAccount: joi.string()
            }).unknown(),
            cashin: joi.object().keys({
              destinationAccount: joi.string(),
              destinationAmount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string(),
              fulfillment: joi.any(),
              status: joi.any(),
              spspServer: joi.string(),
              quote: joi.object()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check wrong pin error message')
      }
    },
    {
      name: 'Return to enter correct pin',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: '1'
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
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: AGENT.pin
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
            cashin: joi.object().keys({
              destinationAccount: joi.string(),
              destinationAmount: joi.string(),
              destinationCurrency: joi.string(),
              destinationName: joi.string(),
              identifier: joi.string(),
              receiver: joi.string(),
              fulfillment: joi.any(),
              status: joi.any(),
              spspServer: joi.string(),
              quote: joi.object()
            }).unknown(),
            context: joi.object()
          }).unknown()
        })).error, null, 'Check wrong pin error message')
      }
    },
    {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
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
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on home screen')
      }
    },
    {
      // go to ministatement screen
      name: 'Ministatement screen',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: AGENT_MINISTATEMENT
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
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on verify pin screen')
      }
    },
    {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
        message: AGENT.pin
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
            ministatement: joi.array().ordered(joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            }).unknown(), joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            }).unknown(), joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            })),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on ministatement screen')
      }
    },
    {
      // back to home screen
      name: 'Home screen',
      method: 'ussd.request',
      params: {
        phone: AGENT.phoneNum,
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
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on home screen')
      }
    },
    {
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
            context: joi.object()
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
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on verify screen')
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
            ministatement: joi.array().items(joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            }), joi.object().keys({
              amount: joi.string(),
              date: joi.string(),
              name: joi.string()
            })),
            context: joi.object()
          }).unknown()
        })).error, null, 'return all params on ministatement screen')
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
