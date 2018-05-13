import { Participant } from './Participant'


const prePensionArtifacts = require('./contracts/PrePension.json');
const Web3 = require('web3');

declare var window: any;

export class Web3Service {
  public web3: any;

  private PrePension: any;
  private PrePensionContract: any;
  public Accounts: any;

  private contractFunctions: any;
  public Participant: Participant

  private network: string = '613203328';
  private web3Url: string = 'ws://5.157.85.76:8546';
  private defaultGas: number = 6721970;
  private defaultGasPrice: string = '1000000000';

  constructor() {
    this.init();
  }

  private async init () {
    let me = this,
      abi = prePensionArtifacts.abi,
      network = prePensionArtifacts.networks[me.network]

      me.web3 = new Web3(me.web3Url)

      me.contractFunctions = {};

      me.Accounts = await me.getAccounts();

      me.PrePension = new me.web3.eth.Contract(abi, network.address, {
        gas       : me.defaultGas,
        gasPrice  : me.defaultGasPrice
      });

      me.PrePensionContract = me.PrePension.methods;

      abi.forEach(entry => {
        entry.fn = me.PrePensionContract[entry.name];
        me.contractFunctions[entry.name] = entry;
      })

      me.Participant = new Participant(me)
  }

  private getAccounts () {
    let me = this
    return me.web3.eth.getAccounts()
  }

  private prepareArgs (fn, args) {

    const me = this;

    return args.map(arg => {
      switch (typeof arg) {
        case 'string':
            return me.web3.utils.asciiToHex(arg)
      }
      return arg;
    })
  }

  private prepareOutput (fn, args) {

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

  public send (fn, args, from, password) {

    const me = this;

    return new Promise((resolve, reject) => {
      me.web3.eth.personal.unlockAccount(from, password).then(function () {
          me.contractFunctions[fn].fn.apply(me, me.prepareArgs(fn, args)).send({ from : from }).then(transaction => {
            resolve(transaction)
          }).catch(err => {
            reject(err)
          })
      })
    })
  }

  public call (fn, args) {

    const me = this;

    return new Promise((resolve, reject) => {
      me.contractFunctions[fn].fn.apply(me, me.prepareArgs(fn, args)).call().then(transaction => {
          resolve(this.prepareOutput(fn, transaction))
        }).catch(reject)
      })
  }
}
