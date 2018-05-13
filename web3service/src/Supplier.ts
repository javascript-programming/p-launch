import { Web3Service } from "./Web3Service";

export class Supplier {

  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
  }

  public getSupplier (id) {
    return this.service.call('getSupplier', [id]);
  }

  public getSuppliers () {
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

      this.service.call('getNumberOfSuppliers').then(number => {
        numberOfSuppliers = parseInt(number)
        fetchSupplier(numberOfSuppliers)
      })
    })
  }

  public addSupplier (account, name, from) {
    return this.service.send('addSupplier', [account, name], from, '123')
  }

}
