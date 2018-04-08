import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public smartAudioProvider: SmartAudioProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.smartAudioProvider.play('splash');
    }, 0);
  }

  continue() {
    this.navCtrl.push('HomePage', {});
  }


}
