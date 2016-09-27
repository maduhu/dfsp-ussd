var path = require('path')
module.exports = {
  ports: [
    require('../httpserver'),
    require('../script'),
    require('../httpclient/api'),
    require('../httpclient/identity')
  ],
  modules: {
    cache: require('ut-cache'),
    ussd: require('ut-ussd').config({baseDir: path.join(__dirname, '../ussd')})
  },
  validations: {
    ussd: require('ut-ussd/validations')
  }
}
