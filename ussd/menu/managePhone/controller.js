module.exports = {
  send: function (params) {
    return this.bus.importMethod('ist.directory.user.get')({
      identifier: params.system.phone
    })
      .then((result) => {
        var primaryDFSP = result.directory_details.find((el) => {
          if (el.primary === 'true') {
            return el
          }
        }
        )
        params.system.isPrimaryDFSP = (primaryDFSP.name === result.currentDFSP)
        return params
      })
      .catch((error) => {
        params.context = error
        return this.redirect('menu/user/wrongUri')
      })
  },
  receive: function (params) {
    delete params.system.isPrimaryDFSP
    return params
  }
}
