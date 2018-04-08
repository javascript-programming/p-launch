import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MockProvider } from "../../providers/mock/mock.provider";
import { PurchaseProvider } from "../../providers/purchase/purchase.provider";

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {

  product: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public mockProvider: MockProvider,
      public purchaseProvider: PurchaseProvider
  ) {
    this.product = this.mockProvider.getFirstProductFromOption(this.navParams.get("option_id"));
  }

  purchaseProduct () {
    this.purchaseProvider.purchaseProduct(this.product);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }
  ionViewDidEnter() {

  }

}

