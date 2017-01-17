module.exports = {
  setUserParams: function (account, accountNumber, params) {
    var result = JSON.parse(JSON.stringify(params))
    result.user.sourceAccount = account.id
    result.user.currencyCode = account.currencyCode
    result.user.currencySymbol = account.currencySymbol
    result.user.sourceAccountName = account.name
    result.user.sourceAccountNumber = accountNumber
    result.user.isDefault = this.isDefaultAccount(params.user.accounts, accountNumber)
    return result
  },
  setAccountsStatus: function (accounts, ledAccounts) {
    var result = ledAccounts.map((led) => {
      led.isDefault = this.isDefaultAccount(accounts, led.accountNumber)
      return led
    })
    return result
  },
  isDefaultAccount: function (accounts, accountNumber) {
    return accounts.filter((acc) => { return acc.accountNumber === accountNumber })[0].isDefault
  }
}
