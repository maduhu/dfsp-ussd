module.exports = {
  ports: [
    require('../httpserver'),
    require('../script'),
    require('../httpclient/directory')
  ],
  modules: {
    cache: require('ut-cache'),
    ussd: require('ut-ussd'),
    identity: require('../service/identity')
  },
  validations: {
    ussd: require('ut-ussd/validations')
  }
}
