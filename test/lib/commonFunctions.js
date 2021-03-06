var seed = (Date.now() - 1463200000000) * 100 // 1463200000000 is 14 May 2016
function next () {
  seed += 1
  return seed % 1000000000
}

var testCustomers = []
var testMerchants = []
var testAgents = []

module.exports = {
  /**
   * @return {number} Random number
   */
  generateRandomNumber: function () {
    return next()
  },

  getCustomer: function (identifier) {
    if (!testCustomers[identifier]) {
      testCustomers[identifier] = {
        phoneNum: this.generateRandomNumber().toString(),
        firstName: 'firstName' + this.generateRandomNumber(),
        lastName: 'lastName' + this.generateRandomNumber(),
        dob: '1911-11-11',
        nationalId: this.generateRandomNumber().toString(),
        accountName: this.generateRandomNumber().toString(),
        role: '1',
        roleName: 'customer',
        pin: '1234'
      }
    }

    return testCustomers[identifier]
  },

  getMerchant: function (identifier) {
    if (!testMerchants[identifier]) {
      testMerchants[identifier] = {
        phoneNum: this.generateRandomNumber().toString(),
        firstName: 'firstName' + this.generateRandomNumber(),
        lastName: 'lastName' + this.generateRandomNumber(),
        dob: '1911-11-11',
        nationalId: this.generateRandomNumber().toString(),
        accountName: this.generateRandomNumber().toString(),
        role: '2',
        roleName: 'merchant',
        pin: '1234'
      }
    }

    return testMerchants[identifier]
  },

  getAgent: function (identifier) {
    if (!testAgents[identifier]) {
      testAgents[identifier] = {
        phoneNum: this.generateRandomNumber().toString(),
        firstName: 'firstName' + this.generateRandomNumber(),
        lastName: 'lastName' + this.generateRandomNumber(),
        dob: '1911-11-11',
        nationalId: this.generateRandomNumber().toString(),
        accountName: this.generateRandomNumber().toString(),
        role: '3',
        roleName: 'agent',
        pin: '1234'
      }
    }

    return testAgents[identifier]
  }
}
