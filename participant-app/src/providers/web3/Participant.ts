import { Web3Service } from "./web3.service";

export class Participant {

  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
  }

  getParticipant (name) {
    return this.service.call('getParticipant', [name])
  }

  addParticipant (account, name, from) {
    return this.service.send('addParticipant', [account, name], from, '123')
  }

}
