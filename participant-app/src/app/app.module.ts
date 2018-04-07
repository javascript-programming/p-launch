import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';

import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
<<<<<<< HEAD:participant-app/src/app/app.module.ts
import { OptionsPage } from '../pages/options/options';
=======
import { MyApp } from './app.component';
>>>>>>> b2ff13ced5efdd487ba56205d0fc384f9060a007:participant-app/src/app/app.module.ts

import { MockProvider } from '../providers/mock/mock.provider';
<<<<<<< HEAD:participant-app/src/app/app.module.ts
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
=======
import { Web3Service } from '../providers/web3/web3.service';

@NgModule({
  declarations: [MyApp, HomePage, TestPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, TestPage],
>>>>>>> b2ff13ced5efdd487ba56205d0fc384f9060a007:participant-app/src/app/app.module.ts
  providers: [
    StatusBar,
    SplashScreen,
    SmartAudioProvider,
    NativeAudio,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Web3Service,
    MockProvider,
<<<<<<< HEAD:participant-app/src/app/app.module.ts
      OptionsProvider
  ]
=======
  ],
>>>>>>> b2ff13ced5efdd487ba56205d0fc384f9060a007:participant-app/src/app/app.module.ts
})
export class AppModule {}
