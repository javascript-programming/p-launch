import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NativeAudio } from '@ionic-native/native-audio';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MockProvider } from '../providers/mock/mock.provider';
import { OptionsProvider } from "../providers/options/options.provider";
import { PensionServiceProvider } from '../providers/pension-service/pension-service';
import {PurchaseProvider} from "../providers/purchase/purchase.provider";
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { Web3Service } from '../providers/web3/web3.service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
      PurchaseProvider,
      Web3Service
  ],
})
export class AppModule {}
