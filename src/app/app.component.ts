import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, IonicApp, App} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {FirebaseService} from '../providers/firebase/firebase-service';
import {Toast} from '@ionic-native/toast';
declare let navigator: any;
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild('myNav') nav: NavController;
    rootPage: any;
    platform: any;
    backPressed: boolean = false;
    constructor(private toast: Toast, private app: App, private ionicApp: IonicApp, _platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public _firebaseService: FirebaseService) {
        this.platform = _platform;
        _platform.ready().then(() => {
            this.checkBackButton();
            if (_firebaseService.isLoggedIn()) {
                this.rootPage = TabsPage;
            } else {
                this.rootPage = LoginPage;
            }
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    checkBackButton() {
        this.platform.registerBackButtonAction(() => {
            let ready = true;
            let activePortal = this.ionicApp._loadingPortal.getActive() ||
                this.ionicApp._modalPortal.getActive() ||
                this.ionicApp._toastPortal.getActive() ||
                this.ionicApp._overlayPortal.getActive();
            if (activePortal) {
                ready = false;
                var refVar = activePortal;
                activePortal.dismiss();
                activePortal = refVar;
            } else {
                if (!this.backPressed) {
                    this.backPressed = true;
                    if (this.platform.is('cordova')) {
                        this.toast.show('Press Again To Exit App', '2000', 'bottom').subscribe(
                            toast => {
                            });
                    } else {
                        console.log("please run on a device");
                    }
                    setTimeout(() => this.backPressed = false, 2000);
                    return;
                } else {
                    navigator['app'].exitApp();
                }
            }
        }, 100);
    }
}
