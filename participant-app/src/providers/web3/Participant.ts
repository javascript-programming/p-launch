import {Web3Service} from "./web3.service";

export class Participant {

  private contract:any = null
  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
    this.contract = service.PrePensionContract;
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

  addParticipant (account, name, from) {
    let me = this

    return new Promise((resolve, reject) => {
      me.web3.eth.personal.unlockAccount(from, '123').then(function () {
        me.PrePensionContract.addParticipant(account, me.web3.utils.asciiToHex(name)).send({ from: from }).then(transaction => {
          resolve(transaction)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }

}
