import { Web3Service } from "./Web3Service";

export class Participant {

  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
  }

  public getParticipant (name) {
    return this.service.call('getParticipant', [name])
  }

  public addParticipant (account, name, from) {
    return this.service.send('addParticipant', [account, name], from, '123')
  }

}
