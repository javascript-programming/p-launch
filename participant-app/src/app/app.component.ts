import {Component, NgZone} from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';

import { HomePage } from '../pages/home/home';
import { Web3Service } from '../providers/web3/web3.service';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    smartAudioProvider: SmartAudioProvider,
    private ngZone: NgZone,
    private web3Service: Web3Service
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      smartAudioProvider.preload('splash', 'assets/audio/splash.mp3');

      // Call service to load blockchain accounts
      this.web3Service.init();
    });
  }
}
