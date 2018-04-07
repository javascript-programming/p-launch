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
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].id === parseInt(id, 10)) {
        return this.participants[i];
      }
    }
    return null;
  }

  getAllSuppliers() {
    return this.suppliers;
  }

  getSupplier(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.suppliers.length; i++) {
      if (this.suppliers[i].id === parseInt(id, 10)) {
        return this.suppliers[i];
      }
    }
    return null;
  }
}
