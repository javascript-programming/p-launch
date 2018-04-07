import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';

import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { MyApp } from './app.component';

import { MockProvider } from '../providers/mock/mock.provider';
import { Web3Service } from '../providers/web3/web3.service';

@NgModule({
  declarations: [MyApp, HomePage, TestPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, TestPage],
  providers: [
    StatusBar,
    SplashScreen,
    SmartAudioProvider,
    NativeAudio,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Web3Service,
    MockProvider,
  ],
})
export class AppModule {}
