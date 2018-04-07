import { Injectable } from '@angular/core';

/*
 Generated class for the PensionServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class PensionServiceProvider {
  age: number;
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
  }

  calculate(participant, lumpsum) {
      this.age = participant.age;
      this.factor = participant.factor;
      this.currentTotalPensionAmount = this.newTotalPensionAmount = participant.totalPensionAmount;
      this.maxPossibleLumpsum = participant.maxLumpsumPercentage * this.currentTotalPensionAmount;
      this.currentEntitlementPerYear = Math.round(this.currentTotalPensionAmount / this.factor);
      this.currentEntitlementPerMonth = Math.round(this.currentEntitlementPerYear / 12);

    this.newTotalPensionAmount = Math.round(
      this.currentTotalPensionAmount - lumpsum
    );

    this.newEntitlementPerYear = Math.round(this.newTotalPensionAmount / this.factor);
    this.newEntitlementPerMonth = Math.round(this.newEntitlementPerYear / 12);
  }
}
