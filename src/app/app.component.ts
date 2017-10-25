import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { FirebaseService } from '../providers/firebase/firebase-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public _firebaseService: FirebaseService) {
    platform.ready().then(() => {
      if (_firebaseService.isLoggedIn()) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
