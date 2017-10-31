import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController, App } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { EditSettingsPage } from './../edit-settings/edit-settings';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { ChangePassword } from '../../components/change-password/change-password';
import { config } from '../../app/app.config';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  userDetails: any;
  userSettingData: any;
  currentYear: number;
  constructor(public navCtrl: NavController, public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase, public modalCtrl: ModalController, public afAuth: AngularFireAuth, public popoverCtrl: PopoverController, public app: App) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userDetails = this._firebaseService.getLoggedUser() || JSON.parse(localStorage.getItem('userDetails'));;
    const dateObject = new Date();
    this.currentYear = dateObject.getFullYear();
    this.afoDatabase.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: this.userDetails['uid']
      }
    }).subscribe((user) => {
      console.log(user)
      if (user.length > 0) {
        this.userSettingData = user[0];
      } else {
        this.userSettingData = config.defaultUserDetails;
      }
      if (user.length == 0) {
        this.editprofile()
      }
    }, (err) => {
      console.log(err)
    });
  }

  editprofile() {
    let editSettingsModel = this.modalCtrl.create(EditSettingsPage, { useruid: this.userDetails['uid'], userEmail: this.userDetails['email'], userSettingData: this.userSettingData });
    editSettingsModel.present();
    editSettingsModel.onDidDismiss((data) => {
    })
  }

  changePassword() {
    let changePasswordPopover = this.popoverCtrl.create(ChangePassword, { useruid: this.userDetails['uid'] });
    changePasswordPopover.present();
    changePasswordPopover.onDidDismiss((data) => {
    })
  }

  logout() {
    this._firebaseService.logout().catch((err) => {
      console.log(err)
    }).then((data) => {
      localStorage.clear();
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
