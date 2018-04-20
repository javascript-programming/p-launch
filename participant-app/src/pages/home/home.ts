import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MockProvider } from '../../providers/mock/mock.provider';
import { PensionServiceProvider } from '../../providers/pension-service/pension-service';
import { PurchaseProvider } from '../../providers/purchase/purchase.provider';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import {Web3Service} from "../../providers/web3/web3.service";

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
    private purchaseProvider: PurchaseProvider,
    public web3Service: Web3Service
  ) {
    this.lumpsum = 5000;

    //get mock participant
    this.participant = this.mockProvider.getParticipant(1);

    //load participant data from blockchain and add to partipant
    this.web3Service.getParticipant(this.web3Service.web3.utils.asciiToHex(this.participant.name) ).then((data) => {
        this.participant.data = data;
        this.changeLumpsum();
    });

    this.showYearly = false;
  }

  changeLumpsum() {
    this.pensionServiceProvider.calculate(this.participant, this.lumpsum);
  }

  gotoOptionsPage() {
    this.navCtrl.push('OptionsPage',{ go: true });
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
