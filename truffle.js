// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      gas: 6712392,
      network_id: "5777" // Match any network id
    }
  }
}
