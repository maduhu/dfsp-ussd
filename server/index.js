module.exports = {
  ports: [
    require('../httpserver')
  ],
  modules: {
    cache: require('ut-cache'),
    ussd: require('ut-ussd')
  }
}
