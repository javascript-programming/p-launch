// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: "5.157.85.76",
      port: 8545,
      gas: 6712392,
      network_id: "613203328" // Match any network id
    }
  }
}
