import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NativeAudio } from '@ionic-native/native-audio';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { OptionsPage } from '../pages/options/options';
import { TestPage } from '../pages/test/test';
import { MockProvider } from '../providers/mock/mock.provider';
import { OptionsProvider } from '../providers/options/options.provider';
import { PensionServiceProvider } from '../providers/pension-service/pension-service';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { Web3Service } from '../providers/web3/web3.service';
import { MyApp } from './app.component';

@NgModule({
  declarations: [MyApp, HomePage, TestPage, OptionsPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, TestPage, OptionsPage],
  providers: [
    StatusBar,
    SplashScreen,
    SmartAudioProvider,
    NativeAudio,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Web3Service,
    MockProvider,
    OptionsProvider,
    PensionServiceProvider,
  ],
})
export class AppModule {}
