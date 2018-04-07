import { Injectable } from '@angular/core';

/*
 Generated class for the PensionServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class PensionServiceProvider {
  age: number;
  sex: string;

  currentEntitlementPerYear: number;
  currentEntitlementPerMonth: number;
  currentTotalPensionAmount: number;
  newEntitlementPerYear: number;
  newEntitlementPerMonth: number;
  newTotalPensionAmount: number;

  maxPossibleLumpsum: number;
  factor: number;

  constructor() {
    console.log('Hello PensionServiceProvider Provider');
    this.age = 55;
    this.factor = 6.3;
    this.currentTotalPensionAmount = this.newTotalPensionAmount = 126000;
    this.maxPossibleLumpsum = 0.1 * this.currentTotalPensionAmount;
    this.currentEntitlementPerYear = Math.round(this.currentTotalPensionAmount / this.factor);
    this.currentEntitlementPerMonth = Math.round(this.currentEntitlementPerYear / 12);
    this.calculate(0);
  }

  calculate(lumpsum) {
    const perc = 1.05,
      max = 67;
    this.newTotalPensionAmount = Math.round(this.currentTotalPensionAmount - lumpsum * Math.pow(perc, max - this.age));

    this.newEntitlementPerYear = Math.round(this.newTotalPensionAmount / this.factor);
    this.newEntitlementPerMonth = Math.round(this.newEntitlementPerYear / 12);
  }
}
