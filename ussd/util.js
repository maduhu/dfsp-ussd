var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

module.exports = {
  formatDate: function (d) {
    return d.getDate() + '-' + monthNames[d.getMonth()] // + ' ' + d.getFullYear()
  }
}
