module.exports = {
  ports: [
    require('../httpserver'),
    require('../httpclient/directory')
  ],
  modules: {
    cache: require('ut-cache'),
    ussd: require('ut-ussd')
  }
}
