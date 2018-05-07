import {Web3Service} from "./web3.service";

export class Supplier {

  private contract:any = null
  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
    this.contract = service.PrePensionContract;
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

  addSupplier (account, name, from) {
    let me = this

    return new Promise((resolve, reject) => {
      me.web3.eth.personal.unlockAccount(from, '123').then(function () {
        me.PrePensionContract.addSupplier(account, me.web3.utils.asciiToHex(name)).send({from: from}).then(transaction => {
          resolve(transaction)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }

}
