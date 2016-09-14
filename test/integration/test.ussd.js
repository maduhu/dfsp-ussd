/*  eslint ut-lint/exists:0 */

var test = require('ut-run/test')
require('dfsp-directory')
require('dfsp-api')
require('dfsp-rule')
var joi = require('joi')
const ACCOUNTNUM = '00359######'
const PHONENUM = '259637'
const INITMSG = '*123#'
const SENDMONEY = '1'
const HOME = '0'
const BACK = '1'
const AMOUNT = '1000'
const VERIFY = '*'
const ACCOUNT = 'https://####.###/######'
const CURRENCY = 'TZS'

test({
  type: 'integration',
  name: 'Ussd service',
  client: require('../client'),
  clientConfig: require('../client/test'),
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
              routes: joi.object(),
              message: joi.string().valid(INITMSG),
              state: joi.string(),
              requestParams: joi.object()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // send money screen
      name: 'Send money menu',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: SENDMONEY
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
              message: joi.string().valid(SENDMONEY),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object(),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // recepient screen
      name: 'Enter destination number',
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
              message: joi.string().valid(ACCOUNTNUM),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT).required(),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required()
            }),
            context: joi.object()
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
              message: joi.string().valid(AMOUNT),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required()
            }),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
      // verify screen
      name: 'Enter PIN',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: VERIFY
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
              message: joi.string().valid(VERIFY),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
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
              message: joi.string().valid(HOME),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
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
              message: joi.string().valid(HOME),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on wrong request in home screen')
      }
    }, {
      // back to send money
      name: 'Send money - back code',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: BACK
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
              message: joi.string().valid(BACK),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // send money successful
      name: 'Send money - successful',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: SENDMONEY
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
              message: joi.string().valid(SENDMONEY),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
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
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object().keys({
              code: joi.number().required(),
              message: joi.string().valid('User not found').required(),
              errorPrint: joi.string().required(),
              type: joi.string().required().valid('Directory.UserNotFound'),
              method: joi.string().required().valid('directory.user.get')
            }).required()
          }).required()
        }).required()).error, null, 'return all params on wuser not found screen')
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
              message: joi.string().valid(HOME),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on home screen')
      }
    }, {
      // send money
      name: 'Send money - successful after wrong destination',
      method: 'ussd.request',
      params: {
        phone: PHONENUM,
        message: SENDMONEY
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
              message: joi.string().valid(SENDMONEY),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
      // destination account
      name: 'Enter destination - successful',
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
              message: joi.string().valid(ACCOUNTNUM),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
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
              message: joi.string(),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on wrong input screen')
      }
    }, {
      // Back to amount screen
      name: 'Back to amount screen',
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
              message: joi.string().valid(HOME),
              state: joi.string(),
              requestParams: joi.object(),
              prevState: joi.string()
            }),
            sourceAccount: joi.string().required().valid(ACCOUNT),
            transfer: joi.object().keys({
              destinationName: joi.string(),
              destinationCurrency: joi.string().required().valid(CURRENCY),
              destinationAccount: joi.string().valid(ACCOUNT).required(),
              destinationAmount: joi.string().valid(AMOUNT).required(),
              fee: joi.number().required(),
              fulfillment: joi.string()
            }),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }])
  }
})
