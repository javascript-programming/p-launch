import { Web3Service } from "./Web3Service";

export class Participant {

  private service:any = null

  constructor (service: Web3Service) {
    this.service = service
  }

  public getParticipant (name: string) {
    return this.service.call('getParticipant', [name])
  }

  public getParticipantBalance (participant: string) {
    return this.service.call('getParticipantBalance', [name])
  }

  public addParticipant (account: string, name: string, from: string) {
    return this.service.send('addParticipant', [account, name], from, '123')
  }

  public getMintedForParticipant (pension: string, participant:string) {
    return this.service.send('getMintedForParticipant', [pension, participant])
  }

  public getNumberOfPensions (participant: string) {
    return this.service.send('getNumberOfPensions', [participant])
  }

  public getParticipantPension (participant: string, id: number) {
    return this.service.send('getParticipantPension', [participant])
  }

  //To do get all pensions and iterate pensions sum balance maybe

  //purchase (bytes32 _participant, bytes32 _supplier, uint _amount)
  public purchase (participant: string, supplier: string, amount: number) {
    return this.service.send('purchase', [participant, supplier, amount], 'todo: get participant account first', '123')
  }

}
