/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const CUSTOMER = commonFunc.getCustomer('customer7')
const CUSTOMER_2 = commonFunc.getCustomer('customer2')
const INIT_MSG = '*123#'
const FIRST_OPTION = '1'
const SECOND_OPTION = '2'
const THIRD_OPTION = '3'
const FIFTH_OPTION = '5'
const HOME = '0'
const ACCOUNT_NAME = new Date().toISOString()
const FULL_AMOUNT = '99500'

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
      name: 'Manage account menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
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
      name: 'Add account menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in add account screen')
      }
    },
    {
      name: 'Enter account name',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: ACCOUNT_NAME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Enter account name')
      }
    },
    {
      name: 'Set primary account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check set primary account screen')
      }
    },
    {
      name: 'Enter wrong pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check error message')
      }
    },
    {
      name: 'Return back to enter correct pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '1'
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
      name: 'Enter correct pin',
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
      name: 'Navigate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check select account screen')
      }
    },
    {
      name: 'Select newly created account',
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
        })).error, null, 'Check home screen')
      }
    },
    {
      name: 'Manage account menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in manage account screen')
      }
    },
    {
      name: 'Add account menu',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FIRST_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check info in add account screen')
      }
    },
    {
      name: 'Enter account name',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: ACCOUNT_NAME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Enter account name')
      }
    },
    {
      name: 'Set primary account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check set primary account screen')
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
      name: 'Navigate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check select account screen')
      }
    },
    {
      name: 'Manage account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check manage account screen')
      }
    },
    {
      name: 'Try to delete account with funds in it',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: THIRD_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().valid('Your can not delete this account as there are funds in it. \n\n0. Home'),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check manage account screen')
      }
    },
    {
      name: 'Navigate to home screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check select account screen')
      }
    },
    {
      name: 'Send money menu',
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
            }),
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
              isDefault: joi.boolean(),
              isSignatory: joi.boolean(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        }).unknown()).error, null, 'return all params on send money screen')
      }
    },
    {
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: CUSTOMER_2.phoneNum
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
            }),
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
              isDefault: joi.boolean(),
              isSignatory: joi.boolean(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        }).unknown()).error, null, 'Check destination number screen')
      }
    },
    {
      name: 'Enter amount',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FULL_AMOUNT
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
            }),
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
              isDefault: joi.boolean(),
              isSignatory: joi.boolean(),
              actorAccountId: joi.string(),
              sourceAccountType: joi.string(),
              permissions: joi.array()
            }).unknown(),
            context: joi.object()
          }).unknown()
        }).unknown()).error, null, 'Check amount screen')
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
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
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
            context: joi.object().keys({})
          }).unknown()
        }).unknown()).error, null, 'Check verify screen')
      }
    },
    {
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
            context: joi.object()
          }).unknown()
        }).unknown()).error, null, 'Check home screen')
      }
    },
    {
      name: 'Check balance',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: FIFTH_OPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object().keys({
            system: joi.object(),
            user: joi.object(),
            context: joi.object()
          }).unknown(),
          sourceAddr: joi.any()
        })).error, null, 'Balance check')
      }
    },
    {
      name: 'Enter pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: CUSTOMER.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object().keys({
            accountId: joi.string(),
            accountNumber: joi.string(),
            actorAccountId: joi.string(),
            actorId: joi.string(),
            context: joi.object(),
            isDefault: joi.boolean(),
            isSignatory: joi.boolean(),
            permissions: joi.array(),
            system: joi.object(),
            user: joi.object().keys({
              accountBalance: joi.string().valid('0.00')
            }).unknown()
          }).unknown(),
          sourceAddr: joi.any()
        })).error, null, 'Check that there are not funds left')
      }
    },
    {
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
            context: joi.object()
          }).unknown()
        }).unknown()).error, null, 'Check home screen')
      }
    },
    {
      name: 'Switch account screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '4'
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
        }).unknown()).error, null, 'Check switch account screen')
      }
    },
    {
      name: 'Select account screen',
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
        }).unknown()).error, null, 'Check switch account screen')
      }
    },
    {
      name: 'Switch account screen',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '4'
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
        }).unknown()).error, null, 'Check switch account screen')
      }
    },
    {
      name: 'Select account screen',
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
        }).unknown()).error, null, 'Check switch account screen')
      }
    },
    {
      name: 'Manage account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '3'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check manage account screen')
      }
    },
    {
      name: 'Close account',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '3'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check close account screen')
      }
    },
    {
      name: 'Enter wrong customer pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: 'fail'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check error message')
      }
    },
    {
      name: 'Return to enter correct pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: '1'
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object(),
          sourceAddr: joi.any()
        })).error, null, 'Check pin validation')
      }
    },
    {
      name: 'Enter customer pin',
      method: 'ussd.request',
      params: {
        phone: CUSTOMER.phoneNum,
        message: CUSTOMER.pin
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string(),
          debug: joi.object().keys({
            accountId: joi.string(),
            accountNumber: joi.string(),
            actorAccountId: joi.string(),
            actorId: joi.string(),
            context: joi.object(),
            isDefault: joi.boolean(),
            isSignatory: joi.boolean(),
            permissions: joi.array(),
            system: joi.object(),
            user: joi.object()
          }).unknown(),
          sourceAddr: joi.any()
        })).error, null, 'Check that the account has been deleted')
      }
    },
    {
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
            context: joi.object()
          }).unknown()
        }).unknown()).error, null, 'Check home screen')
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
    }]
    )
  }
}, module.parent)
