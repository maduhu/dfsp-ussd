var userHelper = require('../../../userHelper')
module.exports = {
  send: function (params) {
    return params
  },
  receive: function (params) {
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: params.system.input.requestParams.accountNumber
    })
    .then((res) => {
      params = userHelper.setUserParams(res, params.system.input.requestParams.accountNumber, params)
      return params
    })
  }
}
