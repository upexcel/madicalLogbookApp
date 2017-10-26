import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { EditSettingsPage } from './../edit-settings/edit-settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  userDetails: any;
  userSettingData: any;
  constructor(public navCtrl: NavController, public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase, public modalCtrl: ModalController) {
    this.userDetails = this._firebaseService.getLoggedUser();
    afoDatabase.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: this.userDetails['uid']
      }
    }).subscribe((user) => {
      console.log(user)
      console.log(this.userDetails)
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
}
