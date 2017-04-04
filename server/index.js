var path = require('path')
var ussdValidation = require('ut-ussd/validations')
module.exports = {
  ports: [
    require('../httpserver'),
    require('../script'),
    require('../httpclient/api')
  ],
  modules: {
    cache: require('ut-cache'),
    ussd: require('ut-ussd').config({baseDir: path.join(__dirname, '../ussd')})
  },
  validations: {
    ussd: Object.keys(ussdValidation).reduce((all, key) => {
      all[key] = ussdValidation[key]
      all[key].auth = 'basic'
      return all
    }, {})
  }
}
