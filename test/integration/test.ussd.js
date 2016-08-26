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
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on send money screen')
      }
    }, {
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
            destinationName: joi.string(),
            destinationCurrency: joi.string().required().valid(CURRENCY),
            destinationAccount: joi.string().valid(ACCOUNT).required(),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on destination number screen')
      }
    }, {
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
            destinationName: joi.string(),
            destinationCurrency: joi.string().required().valid(CURRENCY),
            destinationAccount: joi.string().valid(ACCOUNT).required(),
            destinationAmount: joi.string().valid(AMOUNT).required(),
            fee: joi.number().required(),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }, {
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
            destinationName: joi.string(),
            destinationCurrency: joi.string().required().valid(CURRENCY),
            destinationAccount: joi.string().valid(ACCOUNT).required(),
            destinationAmount: joi.string().valid(AMOUNT).required(),
            fee: joi.number().required(),
            fulfillment: joi.string(),
            context: joi.object()
          }).required()
        }).required()).error, null, 'return all params on amount screen')
      }
    }])
  }
})
