module.exports = {
  id: 'script',
  createPort: require('ut-port-script'),
  imports: ['ussd'],
  logLevel: 'trace',
  log: {
    transform: {
      payee: 'hide',
      name: 'hide',
      firstName: 'hide',
      lastName: 'hide',
      nationalId: 'hide',
      dob: 'hide'
    }
  }
}
