import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './../../providers/firebase/firebase-service';
import { TabsPage } from '../../pages/tabs/tabs';
import { RegistrationPage } from '../../pages/registration/registration';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  spinner: boolean = false;
  googleSpinner: boolean = false;
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public _firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$')
      ])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  login(form) {
    if (form.valid) {
      this.spinner = true;
      this.errorMessage = null;
      this._firebaseService.loginUserWithEmailPassword(form.value['email'], form.value['password']).then((user) => {
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

  signInWithGoogle() {
    this.googleSpinner = true;
    this.errorMessage = null;
    this._firebaseService.loginWithGoogle(this.navCtrl).then((user) => {
      this.googleSpinner = false;
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      console.log(err)
      this.googleSpinner = false;
      this.errorMessage = err['message'];
    })
  }

  gotoSignUp() {
    this.navCtrl.push(RegistrationPage);
  }
}
