import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MockProvider } from '../../providers/mock/mock.provider';
import { PensionServiceProvider } from '../../providers/pension-service/pension-service';
import { PurchaseProvider } from '../../providers/purchase/purchase.provider';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private showYearly: boolean;
  private lumpsum: number;
  private participant: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mockProvider: MockProvider,
    public pensionServiceProvider: PensionServiceProvider,
    public smartAudioProvider: SmartAudioProvider,
    private purchaseProvider: PurchaseProvider
  ) {
    this.lumpsum = 5000;
    this.participant = this.mockProvider.getParticipant(1);
    this.showYearly = false;

    this.changeLumpsum();
  }

  changeLumpsum() {
    this.pensionServiceProvider.calculate(this.participant, this.lumpsum);
  }

  gotoOptionsPage() {
    this.navCtrl.push('OptionsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.smartAudioProvider.play('home');
    }, 0);
  }

  continue() {
    this.navCtrl.push('OptionsPage', { go: true });
  }
}
