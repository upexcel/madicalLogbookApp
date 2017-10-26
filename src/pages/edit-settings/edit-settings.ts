import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'page-edit-settings',
  templateUrl: 'edit-settings.html',
})
export class EditSettingsPage implements OnInit {
  useruid: string;
  userEmail: string;
  userSettingData: any;
  editSettingsForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public _viewCtrl: ViewController) {
    this.useruid = navParams.get('useruid');
    this.userEmail = navParams.get('userEmail');
    this.userSettingData = navParams.get('userSettingData');
  }

  ngOnInit() {
    if (this.userSettingData) {
      this.editSettingsForm = this.formBuilder.group({
        // date: [this.editLogData['date'], Validators.compose([Validators.required])],
        // patientNumber: [this.editLogData['patientNumber'], Validators.compose([Validators.required])],
        // supervisor: [this.editLogData['supervisor'], Validators.compose([Validators.required])]
      });
    } else {
      this.editSettingsForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        currentHospital: ['', Validators.compose([Validators.required])],
        currentCountry: ['', Validators.compose([Validators.required])],
        medicalSchool: ['', Validators.compose([Validators.required])],
        startYear: ['', Validators.compose([Validators.required])],
        generalAnnouncements: [false, Validators.compose([Validators.required])],
        emailFromPartners: [false, Validators.compose([Validators.required])],
        email: [{ value: this.userEmail, disabled: true }, Validators.compose([Validators.required])],
        password: ['password', Validators.compose([Validators.required])]
      });
    }
  }

  update(form) {
    if (form.valid) {
      console.log(form.value)
    }
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

}
