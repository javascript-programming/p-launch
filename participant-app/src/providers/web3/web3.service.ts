import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const prePensionArtifacts = require('../../../../build/contracts/PrePension.json');
const Web3 = require('web3');

declare var window: any;

@Injectable()
export class Web3Service {
  private web3: any;

  private PrePension: any;
  private PrePensionContract: any;
  private Accounts;
  private gas = 6721970;

  constructor() {
  }

  init () {
    let me = this,
      abi = prePensionArtifacts.abi,
      network = prePensionArtifacts.networks['613203328']

      me.web3 = new Web3('ws://5.157.85.76:8546')
      me.fetchAccounts().then(acc => {
        me.Accounts = acc
        me.PrePension = new me.web3.eth.Contract(abi, network.address);
        me.PrePensionContract = me.PrePension.methods;
        me.getSuppliers().then(result => {
        })
      })
  }

  fetchAccounts () {
    let me = this
    return new Promise((resolve, reject) => {
      me.web3.eth.getAccounts().then(acc => {
        resolve(acc)
      }).catch(reject)
    });
  }

  getAccounts () {
    return this.Accounts
  }

  getSupplier (id) {
    let me = this

    return new Promise((resolve, reject) => {
      me.PrePensionContract.getSupplierById(id).call().then(result => {
        resolve({
          name : me.web3.utils.toUtf8(result[0])
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  getSuppliers () {
    let me = this
    let numberOfSuppliers = 0
    let suppliers = []

    return new Promise((resolve, reject) => {
      let fetchSupplier = (id) => {
        me.getSupplier(id).then(result => {
          suppliers.push(result)
          numberOfSuppliers -= 1
          if (numberOfSuppliers > 0) {
            fetchSupplier(numberOfSuppliers)
          } else {
            resolve(suppliers)
          }
        })
      }

      me.PrePensionContract.getNumberOfSuppliers().call().then(number => {
        numberOfSuppliers = parseInt(number)
        fetchSupplier(numberOfSuppliers)
      })
    })
  }

  getParticipant (name) {
    let me = this

    return new Promise((resolve, reject) => {
      me.PrePensionContract.getParticipant(name).call().then(result => {
        resolve({
          name : me.web3.utils.toUtf8(result[0]),
          balance : parseInt(result[1])
        })
      })
    })
  }

  getPension (name) {
    let me = this

    return new Promise((resolve, reject) => {
      me.PrePensionContract.getPension(name).call().then(result => {
        resolve({
          name : me.web3.utils.toUtf8(result[0])
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
      me.web3.eth.personal.unlockAccount(from, '123').then(function () {
        me.PrePensionContract.addParticipant(account, name, { from: from, gas: me.gas }).then(transaction => {
          resolve(transaction)
        }).catch(err => {
          resolve(err)
        })
      })
    })
  }

}
