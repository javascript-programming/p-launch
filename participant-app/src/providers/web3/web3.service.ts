import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const prePensionArtifacts = require('../../../../build/contracts/PrePension.json');
const Web3 = require('web3');

declare var window: any;

@Injectable()
export class Web3Service {
  public web3: any;

  private PrePension: any;
  private PrePensionContract: any;
  public Accounts;
  private gas = 6721970;
  public contractFunctions: any;

  constructor() {
  }

  init () {
    let me = this,
      abi = prePensionArtifacts.abi,
      network = prePensionArtifacts.networks['613203328']

      me.web3 = new Web3('ws://5.157.85.76:8546')

      me.contractFunctions = {};

      me.fetchAccounts().then(acc => {
          me.Accounts = acc

          me.PrePension = new me.web3.eth.Contract(abi, network.address, {
            gas       : me.gas,
            gasPrice  : '1000000000'
          });

          me.PrePensionContract = me.PrePension.methods;

          abi.forEach(entry => {
            entry.fn = me.PrePensionContract[entry.name];
            me.contractFunctions[entry.name] = entry;
          })
          debugger
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

  prepareArgs (fn, args) {

    const me = this;

    return args.map(arg => {
      switch (typeof arg) {
        case 'string':
            return me.web3.utils.asciiToHex(arg)
      }
      return arg;
    })
  }

  prepareOutput (fn, args) {

    const me = this;

    if (!Array.isArray(args)) {
       args = [args]
     }

     args = args.map(arg => {
       switch (typeof arg) {
         case 'string':
           return me.web3.utils.toUtf8(arg);
         case 'number':
           return parseInt(arg);
       }

       return arg;
     })

    return args.length === 1 ? args[0] : args
  }

  send(fn, args, from) {

    const me = this;

    return new Promise((resolve, reject) => {
      me.web3.eth.personal.unlockAccount(from, '123').then(function () {
          me.contractFunctions[fn].fn.apply(me, me.prepareArgs(fn, args)).send({ from : from }).then(transaction => {
            resolve(transaction)
          }).catch(err => {
            reject(err)
          })
      })
    })
  }

  call(fn, args) {

    const me = this;

    return new Promise((resolve, reject) => {
      me.contractFunctions[fn].fn.apply(me, me.prepareArgs(fn, args)).call().then(transaction => {
          resolve(this.prepareOutput(fn, transaction))
        }).catch(err => {
          reject(err)
        })
      })
  }

  // addDummyData (callback) {
  //   let me = this
  //     me.addPension(me.Accounts[1], 'APG', me.Accounts[1]).then(transaction => {
  //       me.addSupplier(me.Accounts[2], 'Rug', me.Accounts[1]).then(transaction => {
  //         me.addSupplier(me.Accounts[3], 'Reaal', me.Accounts[1]).then(transaction => {
  //           me.addSupplier(me.Accounts[4], 'Solar Panel .inc', me.Accounts[1]).then(transaction => {
  //             me.addParticipant(me.Accounts[0], 'Bart de Jong', me.Accounts[1]).then(transaction => {
  //               me.mint('APG', 'Bart de Jong', 140000, me.Accounts[1]).then(transaction => {
  //                 callback()
  //               })
  //             })
  //           })
  //         })
  //       })
  //     }).catch(err => {
  //       callback(err, false)
  //     })
  // }

}
