import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { OptionsPage } from '../pages/options/options';

import { Web3Service } from '../providers/web3/web3.service';
import { MockProvider } from '../providers/mock/mock.provider';
import {OptionsProvider} from "../providers/options/options.provider";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
      OptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
      OptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SmartAudioProvider,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Web3Service,
    MockProvider,
      OptionsProvider
  ]
})
export class AppModule {}
