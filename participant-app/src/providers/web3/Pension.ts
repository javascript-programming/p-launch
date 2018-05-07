import {Web3Service} from './web3.service'

export class Pension {

  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
  }

  getPension (name) {
    let me = this

    return new Promise((resolve, reject) => {
      me.service.call('getPension', [name]).then(result => {
        resolve({
          name : result[0]
        })
      });
    })
  }

  addPension (account, name, from) {
    let me = this
    return new Promise((resolve, reject) => {
      me.web3.eth.personal.unlockAccount(from, '123').then(function () {
        me.PrePensionContract.addPension(account, me.web3.utils.asciiToHex(name)).send({
          from: from,
          value : 0
        }).then(transaction => {
          resolve(transaction)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }

  mint (pension, participant, balance, from) {

    let me = this;

    return new Promise((resolve, reject) => {
      me.web3.eth.personal.unlockAccount(from, '123').then(function () {
        me.contract.mint(me.web3.utils.asciiToHex(pension),
          me.web3.utils.asciiToHex(participant), balance).send({ from : from }).then(transaction => {
          resolve(transaction);
        }).catch(err => {
          reject(err);
        });
      });
    });
  }

}
