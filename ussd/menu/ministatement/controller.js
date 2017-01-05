module.exports = {
  send: function (params) {
    delete params.ministatement
    return this.bus.importMethod('ledger.ministatement.get')({
      accountNumber: params.user.sourceAccountNumber
    })
    .then((res) => {
      if (res.length) {
        params.ministatement = res
      }
      return params
    })
  },
  receive: function (params) {
    delete params.ministatement
    return params
  }
}
