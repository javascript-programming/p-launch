import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PensionServiceProvider } from '../../providers/pension-service/pension-service';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private age: number;
  private lumpsum: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pensionServiceProvider: PensionServiceProvider,
    public smartAudioProvider: SmartAudioProvider
  ) {
    this.age = 55;
    this.lumpsum = 0;
  }

  changeAge() {
    this.pensionServiceProvider.calculate(this.lumpsum);
  }
  changeLumpsum() {
    this.pensionServiceProvider.calculate(this.lumpsum);
    console.log(this.lumpsum);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.smartAudioProvider.play('splash');
    }, 0);
    //
    // setTimeout(() => {
    //   this.viewCtrl.dismiss();
    // }, 4000);
  }
}
