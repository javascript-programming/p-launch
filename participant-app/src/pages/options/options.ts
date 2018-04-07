import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OptionsProvider } from "../../providers/options/options.provider";

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  options: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public optionsProvider: OptionsProvider
  ) {

    this.options = optionsProvider.getAllOptions()
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }
  ionViewDidEnter() {

  }

}
