import { Participant } from './Participant'


const prePensionArtifacts = require('./contracts/PrePension.json');
const Web3 = require('web3');

declare var window: any;

export class Web3Service {
  public web3: any;

  private PrePension: any;
  private PrePensionContract: any;
  public Accounts: string[];

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

  public functionExists (name: string): boolean {
    return !!this.contractFunctions[name]
  }

  public functionIsView (name: string): boolean {
    return this.contractFunctions[name].stateMutability === 'view'
  }

  public getFunctionInputs (name: string): object[] {
    if (this.functionExists(name)) {
      return this.contractFunctions[name].inputs.slice()
    }

    return [];
  }

  private getFunctionOutputs (name: string): object[] {
    if (this.functionExists(name)) {
      return this.contractFunctions[name].outputs.slice()
    }

    return [];
  }

  private prepareArgs (fn: string, args: any[]): any[] {

    const me = this;
    const inputs = me.getFunctionInputs(fn)

    if (args.length !== inputs.length)
      throw new Error('Input params should be of length ' + inputs.length)

    return args.map((arg, index) => {
      switch (inputs[index]['type']) {
        case 'bytes32':
            return me.web3.utils.asciiToHex(arg)
        case 'uint256':
            return parseInt(arg)
      }
      return arg;
    })
  }

  private prepareOutput (fn, args): any {

    const me = this;
    const outputs = me.getFunctionOutputs(fn)

    if (me.functionIsView(fn)) {

      if (!Array.isArray(args)) {
        args = [args]
      }

      let result = {}

      args = args.forEach((arg, index) => {

        let output = outputs[index];

        switch (output['type']) {
          case 'bytes32':
             result[output['name']] = me.web3.utils.toUtf8(arg);
             break;
          case 'number':
            result[output['name']] = arg.toNumber();
            break
        }
      })

      let keys = Object.keys(result)
      return keys.length > 1 ? result : result[keys[0]]
    } else {
      return args.length === 1 ? args[0] : args
    }
  }

  public send (fn: string, args: any[], from: string, password: string): Promise<object> {

    const me = this;

    return new Promise((resolve, reject) => {

      if (me.functionExists(fn)) {
        me.web3.eth.personal.unlockAccount(from, password).then(function () {
          me.contractFunctions[fn].fn.apply(me, me.prepareArgs(fn, args)).send({from: from}).then(transaction => {
            resolve(transaction)
          }).catch(err => {
            reject(err)
          })
        })
      } else {
        reject('Function does not exist')
      }
    })
  }

  public call (fn: string, args:any): Promise<any> {

    const me = this;

    return new Promise((resolve, reject) => {
      if (me.functionExists(fn)) {
        me.contractFunctions[fn].fn.apply(me, me.prepareArgs(fn, args)).call().then(transaction => {
          resolve(this.prepareOutput(fn, transaction))
        }).catch(reject)
      }  else {
        reject('Function does not exist')
      }
    })

  }
}
