import { Web3Service } from './Web3Service'

export class Pension {

  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
  }

  getPension (name) {
    return this.service.call('getPension', [name]);
  }

  addPension (account, name, from) {
    return this.service.send('addPension', [account, name], from, '123')
  }

  mint (pension, participant, balance, from) {
    return this.service.send('mint', [pension, participant, balance], from, '123');
  }

}
