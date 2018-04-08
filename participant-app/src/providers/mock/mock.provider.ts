import { Injectable } from '@angular/core';

import { PARTICIPANTS } from './mock-participants';
import { PRODUCTS } from './mock-products';
import { SUPPLIERS } from './mock-suppliers';

@Injectable()
export class MockProvider {
  private participants: any;
  private suppliers: any;
  private products: any;

  constructor() {
    this.participants = PARTICIPANTS;
    this.suppliers = SUPPLIERS;
    this.products = PRODUCTS;
  }

  getAllParticipants() {
    return this.participants;
  }

  getParticipant(id) {
    return this.participants.filter(participant => participant.id === parseInt(id, 10))[0];
  }

  getAllProducts() {
    return this.products;
  }

  getProduct(id) {
    return this.products.filter(product => product.id === +id)[0];
  }

  getFirstProductFromOption(optionId) {
    return this.products.filter(product => product.option_id === +optionId)[0];
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
