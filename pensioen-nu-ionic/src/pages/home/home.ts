import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public smartAudioProvider: SmartAudioProvider
  ) {
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

