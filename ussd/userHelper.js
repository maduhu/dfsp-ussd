module.exports = {
  setUserParams: function (account, accountNumber, params) {
    let result = JSON.parse(JSON.stringify(params))
    let acc = this.getAccount(params.user.accounts, accountNumber)
    result.user.sourceAccount = account.id
    result.user.currencyCode = account.currencyCode
    result.user.currencySymbol = account.currencySymbol
    result.user.sourceAccountName = account.name
    result.user.sourceAccountNumber = accountNumber
    result.user.sourceAccountType = account.accountType
    result.user.isDefault = acc.isDefault
    result.user.isSignatory = acc.isSignatory
    result.user.actorAccountId = acc.actorAccountId
    result.user.permissions = acc.permissions
    return result
  },
  setAccountsStatus: function (accounts, ledAccounts) {
    var result = ledAccounts.map((led) => {
      let account = this.getAccount(accounts, led.accountNumber)
      led.isDefault = account.isDefault
      led.isSignatory = account.isSignatory
      led.actorAccountId = account.actorAccountId
      led.permissions = account.permissions
      return led
    })
    return result
  },
  getAccount: function (accounts, accountNumber) {
    return accounts.filter((acc) => acc.accountNumber === accountNumber)[0]
  }
}
