var path = require('path');
module.exports = {
  ports: [
    require('../httpserver'),
    require('../script'),
    require('../httpclient/api')
  ],
  modules: {
    cache: require('ut-cache'),
    ussd: require('ut-ussd').config({baseDir: path.join(__dirname, '../ussd')}),
    identity: require('../service/identity')
  },
  validations: {
    ussd: require('ut-ussd/validations')
  }
}
