import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
@Component({
  selector: 'page-edit-settings',
  templateUrl: 'edit-settings.html',
})
export class EditSettingsPage implements OnInit {
  useruid: string;
  userEmail: string;
  userSettingData: any;
  editSettingsForm: FormGroup;
  userDBref: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public _viewCtrl: ViewController, public afoDatabase: AngularFireOfflineDatabase) {
    this.useruid = navParams.get('useruid');
    this.userEmail = navParams.get('userEmail');
    this.userSettingData = navParams.get('userSettingData');
    this.userDBref = afoDatabase.list('/users')
  }

  ngOnInit() {
    if (this.userSettingData) {
      this.editSettingsForm = this.formBuilder.group({
        uid: [this.useruid],
        name: [this.userSettingData['name'], Validators.compose([Validators.required])],
        currentHospital: [this.userSettingData['currentHospital'], Validators.compose([Validators.required])],
        currentCountry: [this.userSettingData['currentCountry'], Validators.compose([Validators.required])],
        medicalSchool: [this.userSettingData['medicalSchool'], Validators.compose([Validators.required])],
        startYear: [this.userSettingData['startYear'], Validators.compose([Validators.required])],
        generalAnnouncements: [this.userSettingData['generalAnnouncements'], Validators.compose([Validators.required])],
        emailFromPartners: [this.userSettingData['emailFromPartners'], Validators.compose([Validators.required])],
        email: [{ value: this.userEmail, disabled: true }, Validators.compose([Validators.required])],
        password: [{ value: 'password', disabled: true }, Validators.compose([Validators.required])]
      });
    } else {
      this.editSettingsForm = this.formBuilder.group({
        uid: [this.useruid],
        name: ['', Validators.compose([Validators.required])],
        currentHospital: ['', Validators.compose([Validators.required])],
        currentCountry: ['', Validators.compose([Validators.required])],
        medicalSchool: ['', Validators.compose([Validators.required])],
        startYear: ['', Validators.compose([Validators.required])],
        generalAnnouncements: [false, Validators.compose([Validators.required])],
        emailFromPartners: [false, Validators.compose([Validators.required])],
        email: [{ value: this.userEmail, disabled: true }, Validators.compose([Validators.required])],
        password: [{ value: 'password', disabled: true }, Validators.compose([Validators.required])]
      });
    }
  }

  update(form) {
    if (form.valid) {
      if (this.userSettingData) {
        this.userDBref.update(this.useruid, form.value);
      } else {
        this.userDBref.push(form.value);
      }
      this._viewCtrl.dismiss();
    }
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

}
