import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { TabsPage } from '../../pages/tabs/tabs';
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage implements OnInit {
  registrationForm: FormGroup;
  spinner: boolean = false;
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public _firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$')
      ])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  submit(form) {
    if (form.valid) {
      this.spinner = true;
      this._firebaseService.createUserWithEmailPassword(form.value['email'], form.value['password']).then((user) => {
        this.spinner = false;
        this.navCtrl.setRoot(TabsPage);
      }, (err) => {
        this.spinner = false;
        this.errorMessage = err['message'];
      })
    } else {
      this.errorMessage = 'Please fill all the details';
    }
  }
}
