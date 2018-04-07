import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';

import { HomePage } from '../pages/home/home';
// import { TestPage } from '../pages/test/test';
import { OptionsPage } from '../pages/options/options';
import { PurchasePage } from '../pages/purchase/purchase';

import { MyApp } from './app.component';

import { MockProvider } from '../providers/mock/mock.provider';
import { OptionsProvider } from "../providers/options/options.provider";
import { PensionServiceProvider } from '../providers/pension-service/pension-service';
import {PurchaseProvider} from "../providers/purchase/purchase.provider";
// import { Web3Service } from '../providers/web3/web3.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OptionsPage,
      PurchasePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SmartAudioProvider,
    NativeAudio,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MockProvider,
    OptionsProvider,
    PensionServiceProvider,
      PurchaseProvider
  ],
})
export class AppModule {}
