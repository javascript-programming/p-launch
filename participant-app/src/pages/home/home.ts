import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { PensionServiceProvider } from '../../providers/pension-service/pension-service';
import { MockProvider } from '../../providers/mock/mock.provider';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private showYearly: boolean;
  private age: number;
  private lumpsum: number;
  private participant: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public mockProvider: MockProvider,
      public pensionServiceProvider: PensionServiceProvider,
      public smartAudioProvider: SmartAudioProvider
  ) {
    this.age = 55;
    this.lumpsum = 0;
    this.participant = this.mockProvider.getParticipant(1);
    this.showYearly = false;
  }

  changeAge(){
    this.pensionServiceProvider.calculate(this.lumpsum);
  }
  changeLumpsum(){
    this.pensionServiceProvider.calculate(this.lumpsum);
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

  continue(){
    this.navCtrl.push("OptionsPage", {});
  }
}

