import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
      public loadingCtrl: LoadingController,
      public mockProvider: MockProvider,
      public purchaseProvider: PurchaseProvider
  ) {
    this.product = this.mockProvider.getFirstProductFromOption(this.navParams.get("option_id"));
  }

  purchaseProduct () {
    this.purchaseProvider.purchaseProduct(this.product);

      let loader = this.loadingCtrl.create({
          content: "Product is being purchased",
          duration: 3000
      });

      loader.onDidDismiss(() => {
          let loader2 = this.loadingCtrl.create({
              content: "Product succesfully purchased",
              spinner: 'hide',
              duration: 2000
          });

          loader2.onDidDismiss(() => {
              this.navCtrl.popToRoot();
          });

          loader2.present();
      });

      loader.present();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
  }
  ionViewCanEnter() {
    if (!this.product) {
        setTimeout(()=>{
            this.navCtrl.setRoot('HomePage');
        }, 0);
        return false;
    }
  }

}

