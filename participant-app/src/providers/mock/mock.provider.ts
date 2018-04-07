import { Injectable } from '@angular/core';
import { PARTICIPANTS } from './mock-participants';
import { SUPPLIERS } from './mock-suppliers';

@Injectable()
export class MockProvider {
  private participants: any;
  private suppliers: any;

  constructor() {
    this.participants = PARTICIPANTS;
    this.suppliers = SUPPLIERS;
  }

  getAllParticipants() {
    return this.participants;
  }

  getParticipant(id) {
    for (const participant of this.participants) {
      if (participant.id === parseInt(id, 10)) {
        return participant;
      }
    }
    return null;
  }

  getAllSuppliers() {
    return this.suppliers;
  }

  getSupplier(id) {
    return this.suppliers.filter(supplier => supplier.id === parseInt(id, 10));
  }
}
