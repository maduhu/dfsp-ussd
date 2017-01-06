var formatDate = require('../../../util').formatDate
module.exports = {
  send: function (params) {
    delete params.ministatement
    return this.bus.importMethod('ledger.ministatement.get')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((result) => {
      if (result.length) {
        params.ministatement = result.map((record) => {
          record.date = formatDate(new Date(record.date))
          return record
        })
      }
      return params
    })
    .catch((error) => {
      params.context = error
      return this.redirect('menu/error/generic')
    })
  },
  receive: function (params) {
    delete params.ministatement
    return params
  }
}
