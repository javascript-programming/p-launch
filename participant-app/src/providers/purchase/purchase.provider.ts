import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class PurchaseProvider {
  private readonly API_URL = 'http://localhost:8080';
  private purchased: any;

  constructor(private http: Http) {
    this.purchased = false;
  }

  /**
   * Call the smart contract with the product information
   * this.http.get(`{API_URL}`).pipe(map((res: any) => res.json));
   * @param product
   */
  purchaseProduct(product) {
    this.purchased = true;
  }

  getSuppliers() {
    this.http.get(`${this.API_URL}`).pipe(map((res: any) => res.json));
  }

  getContractParticipant(participantID: any): Observable<any> {
    return this.http.get(`${this.API_URL}/participant/${participantID}`).pipe(map((res: any) => res.json));
  }

  isPurchased() {
    return this.purchased;
  }
}
