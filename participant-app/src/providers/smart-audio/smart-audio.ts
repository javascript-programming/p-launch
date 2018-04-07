import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Platform } from 'ionic-angular';

@Injectable()
export class SmartAudioProvider {
  audioType: string = 'html5';
  sounds: any = [];

  constructor(public nativeAudio: NativeAudio, platform: Platform) {
    if (platform.is('cordova')) {
      this.audioType = 'native';
    }
  }

  preload(key, asset) {
    if (this.audioType === 'html5') {
      const audio = {
        key,
        asset,
        type: 'html5',
      };

      this.sounds.push(audio);
    } else {
      this.nativeAudio.preloadSimple(key, asset);

      const audio = {
        key,
        asset: key,
        type: 'native',
      };

      this.sounds.push(audio);
    }
  }

  play(key) {
    const audio = this.sounds.find(sound => {
      return sound.key === key;
    });

    if (audio.type === 'html5') {
      const audioAsset = new Audio(audio.asset);
      audioAsset.play();
    } else {
      this.nativeAudio.play(audio.asset).then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
