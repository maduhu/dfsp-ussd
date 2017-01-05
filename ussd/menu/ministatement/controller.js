module.exports = {
  send: function (params) {
    return this.bus.importMethod('ledger.ministatement.get')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((res) => {
      params.ministatements = res
      return params
    })
  },
  receive: function (params) {
    delete params.ministatements
    return params
  }
}
