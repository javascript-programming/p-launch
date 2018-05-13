import { Web3Service } from './Web3Service'

export class Pension {

  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
  }

  getPension (name: string) {
    return this.service.call('getPension', [name]);
  }

  getPensionBalance (participant: string, pension: string) {
    return this.service.call('getPensionBalance', [participant, pension]);
  }

  addPension (account, name, from) {
    return this.service.send('addPension', [account, name], from, '123')
  }

  mint (pension, participant, balance, from) {
    return this.service.send('mint', [pension, participant, balance], from, '123');
  }

}
