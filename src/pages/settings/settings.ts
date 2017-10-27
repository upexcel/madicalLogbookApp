import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { EditSettingsPage } from './../edit-settings/edit-settings';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { ChangePassword } from '../../components/change-password/change-password';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  userDetails: any;
  userSettingData: any;
  currentYear: number;
  constructor(public navCtrl: NavController, public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase, public modalCtrl: ModalController, public afAuth: AngularFireAuth, public popoverCtrl: PopoverController) {
    this.userDetails = this._firebaseService.getLoggedUser();
    const dateObject = new Date();
    this.currentYear = dateObject.getFullYear();
    afoDatabase.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: this.userDetails['uid']
      }
    }).subscribe((user) => {
      if (user.length > 0) {
        this.userSettingData = user[0];
      }
      if (user.length == 0) {
        this.editprofile()
      }
    }, (err) => {
      console.log(err)
    });
  }

  ngOnInit() { }

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
      this.navCtrl.setRoot(LoginPage)
    });
  }
}
