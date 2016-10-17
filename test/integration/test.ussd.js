var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var config = require('./../lib/appConfig')
var joi = require('joi')
const ACCOUNTNUM = commonFunc.generateRandomNumber().toString()
const PHONENUM = commonFunc.generateRandomNumber().toString()
const USERNUBMER = commonFunc.generateRandomNumber().toString()
const USERNAME = 'automationTest' + commonFunc.generateRandomNumber()
const PIN = '123'
const INITMSG = '*123#'
const FIRSTOPTION = '1'
const HOME = '0'
const AMOUNT = '1000'
const CURRENCY = 'TZS'
const DESTINATIONNUMBER = 'l1p'
const URI = '/closeUSSDSession'

test({
  type: 'integration',
  name: 'Ussd service',
  server: config.server,
  serverConfig: config.serverConfig,
  client: config.client,
  clientConfig: config.clientConfig,
  peerImplementations: config.peerImplementations,
  steps: function (test, bus, run) {
    run(test, bus, [{
      // home screen
      name: 'Get first menu',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: INITMSG
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              meta: joi.object(),
              routes: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // open an account screen
      name: 'Open an account',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: FIRSTOPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            context: joi.object().keys({}).required(),
            open: joi.object()
          }).required()
        }).required()).error, null, 'return all params on open an account screen')
      }
    }, {
      // username
      name: 'Enter username',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: USERNAME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            context: joi.object().keys({}).required(),
            open: joi.object()
          }).required()
        }).required()).error, null, 'return all params on enter username screen')
      }
    }, {
      // username
      name: 'Enter user number',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: USERNUBMER
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            context: joi.object().keys({}).required(),
            open: joi.object()
          }).required()
        }).required()).error, null, 'return all params on enter user number screen')
      }
    }, {
      // account
      name: 'Enter an account',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: ACCOUNTNUM
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            context: joi.object().keys({}).required(),
            open: joi.object().keys({
              name: joi.string().valid(USERNAME).required(),
              number: joi.string().valid(USERNUBMER).required(),
              account: joi.string().valid(ACCOUNTNUM).required()
            }).required()
          }).required()
        }).required()).error, null, 'return all params on enter an account screen')
      }
    }, {
      // account
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: PIN
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on enter PIN screen')
      }
    }, {
      // account
      name: 'Account created',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              prevState: joi.string(),
              state: joi.string(),
              requestParams: joi.object()
            }),
            context: joi.object().keys({}).required(),
            sourceAccount: joi.string()
          }).required()
        }).required()).error, null, 'return all params on account created screen')
      }
    }, {
      // send money screen
      name: 'Send money menu',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: FIRSTOPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRSTOPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object(),
            context: joi.object().keys({}).required(),
            open: joi.object().keys({
              name: joi.string().valid(USERNAME),
              number: joi.string().valid(ACCOUNTNUM),
              account: joi.string().valid(USERNUBMER)
            })
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // recepient screen
      name: 'Enter destination number',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: DESTINATIONNUMBER
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on destination number screen')
      }
    }, {
      // amount screen
      name: 'Enter amount',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: AMOUNT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(AMOUNT),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required().invalid(0),
              connectorFee: joi.number().required().invalid(0)
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: PIN
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required().invalid(0),
              connectorFee: joi.number().required().invalid(0)
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on verify screen')
      }
    }, {
      // back to home screen
      name: 'Get home menu',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(HOME),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              connectorFee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // wrong request in home screen
      name: 'Send money - wrong code',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(HOME),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              connectorFee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on wrong request in home screen')
      }
    }, {
      // back to send money
      name: 'Send money - back code',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: FIRSTOPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRSTOPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string(),
              destinationAccount: joi.string(),
              destinationAmount: joi.string().valid(AMOUNT),
              fee: joi.number(),
              connectorFee: joi.number()
            }).required(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // send money successful
      name: 'Send money - successful',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: FIRSTOPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRSTOPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // wrong destination number
      name: 'Send destination - wrong destination',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: ''
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object(),
            context: joi.object().keys({
              code: joi.number().required(),
              type: joi.string().valid('PortRPC'),
              print: joi.string().valid('Account not found for userURI=number:').required(),
              errorPrint: joi.string().valid('Account not found for userURI=number:').required(),
              method: joi.string().required().valid('directory.user.get'),
              stackInfo: joi.array()
            }).required()
          }).required()
        }).required()).error, null, 'return all params on user not found screen')
      }
    }, {
      // back to home
      name: 'Send destination - back to home',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: HOME
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(HOME),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // send money
      name: 'Send money - successful after wrong destination',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: FIRSTOPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRSTOPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object(),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // destination account
      name: 'Enter destination - successful',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: DESTINATIONNUMBER
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on destination account screen')
      }
    }, {
      // wrong amount
      name: 'Enter amount - wrong',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: null
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on wrong input screen')
      }
    }, {
      // Back to amount screen
      name: 'Back to amount screen',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: FIRSTOPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string().valid(FIRSTOPTION),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required()
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // Enter valid amount
      name: 'Enter valid amount',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: AMOUNT
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required().invalid(0),
              connectorFee: joi.number().required().invalid(0)
            }),
            context: joi.object().keys({
            }).required()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // Enter invalid PIN
      name: 'Enter invalid PIN',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: ''
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required().invalid(0),
              connectorFee: joi.number().required().invalid(0)
            }),
            context: joi.object().keys({
              stackInfo: joi.array().required(),
              statusCode: joi.number().required(),
              statusMessage: joi.string().required(),
              print: joi.string().required().valid('HTTP error'),
              type: joi.string().required(),
              code: joi.number(),
              method: joi.string().required()}).required()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // Wrong PIN screen and back to enter PIN screen
      name: 'Wrong PIN screen',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: FIRSTOPTION
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          shortMessage: joi.string().required(),
          sourceAddr: joi.string().required().valid(PHONENUM),
          debug: joi.object().keys({
            system: joi.object().keys({
              expire: joi.string(),
              phone: joi.string().required().valid(PHONENUM),
              backtrack: joi.array(),
              routes: joi.object(),
              meta: joi.object(),
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required().invalid(0),
              connectorFee: joi.number().required().invalid(0)
            }),
            context: joi.object().keys({}).required()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // Wrong PIN screen and back to enter PIN screen
      name: 'Wrong PIN screen',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        uri: URI
      },
      error: (error, assert) => {
        assert.true(error.payload.indexOf('Session Closed') > -1, 'Session Closed')
      }
    }])
  }
}, module.parent)
