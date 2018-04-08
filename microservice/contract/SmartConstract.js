class SmartContract {

  constructor () {
    this.setupMainContract()

    this.gas = 6721970
  }

  fixContractProvider (contract) {
    if (typeof contract.currentProvider.sendAsync !== 'function') {
      contract.currentProvider.sendAsync = function () {
        return contract.currentProvider.send.apply(
          contract.currentProvider, arguments
        )
      }
    }
  }

  setupMainContract () {
    let me = this

    let Web3 = require('web3')
    // window.web3 = new Web3(new Web3.providers.HttpProvider('http://5.157.85.76:8545'))
    me.web3 = new Web3('ws://5.157.85.76:8546')

    let contract = require('truffle-contract')
    let prePensionArtifacts = require('../../build/contracts/PrePension.json')

    me.PrePension = contract(prePensionArtifacts)
    me.PrePension.setProvider(me.web3.currentProvider)

    // HACK fix for web3
    me.fixContractProvider(me.PrePension)

    me.PrePension.deployed().then(
      instance => {
        me.PrePensionContract = instance
        me.web3.eth.getAccounts().then(acc => {
          me.Accounts = acc
          me.getParticipant('Bart de jong').next(participant => {
              var v = 1
          })
        })
      }
    )
  }

  getAccounts () {
    return this.Accounts
  }

  getParticipant (name) {
    let me = this

    return new Promise((resolve, reject) => {
      me.PrePensionContract.getParticipant.call(name).then(result => {
        resolve({
          name : me.web3.utils.toUtf8(result[0]),
          balance : result[1].toNumber()
        })
      })
    })
  }

  addDummyData (callback) {
    let me = this
    me.web3.eth.personal.unlockAccount(me.Accounts[1], '123').then(function () {
      me.addPension(me.Accounts[1], 'APG', me.Accounts[1]).then(transaction => {
        me.addSupplier(me.Accounts[2], 'Rug', me.Accounts[1]).then(transaction => {
          me.addSupplier(me.Accounts[3], 'Reaal', me.Accounts[1]).then(transaction => {
            me.addSupplier(me.Accounts[4], 'Solar Panel .inc', me.Accounts[1]).then(transaction => {
              me.addParticipant(me.Accounts[0], 'Bart de Jong', me.Accounts[1]).then(transaction => {
                callback()
              })
            })
          })
        })
      })
    })
  }

  addPension (account, name, from) {
    let me = this

    return new Promise((resolve, reject) => {
      me.PrePensionContract.addPension(account, name, { from: from, gas: me.gas }).then(transaction => {
        resolve(transaction)
      }).catch(err => {
        resolve(err)
      })
    })
  }

  addSupplier (account, name, from) {
    let me = this

    return new Promise((resolve, reject) => {
      me.PrePensionContract.addSupplier(account, name, { from: from, gas: me.gas }).then(transaction => {
        resolve(transaction)
      }).catch(err => {
        resolve(err)
      })
    })
  }

  addParticipant (account, name, from) {
    let me = this

    return new Promise((resolve, reject) => {
      me.PrePensionContract.addParticipant(account, name, { from: from, gas: me.gas }).then(transaction => {
        resolve(transaction)
      }).catch(err => {
        resolve(err)
      })
    })
  }

}

module.exports = SmartContract
