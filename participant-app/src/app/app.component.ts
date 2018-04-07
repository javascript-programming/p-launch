import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';

import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  // rootPage:any = TestPage;
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    smartAudioProvider: SmartAudioProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      smartAudioProvider.preload('splash', 'assets/audio/splash.mp3');
    });
  }
}
