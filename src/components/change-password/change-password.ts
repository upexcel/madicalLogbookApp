import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../providers/firebase/firebase-service';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.html'
})
export class ChangePassword {
    changePasswordForm: FormGroup;
    errorMessage: string;
    updateSpinner = false;
    constructor(private _viewCtrl: ViewController, public formBuilder: FormBuilder, public _firebase: FirebaseService) {
    }
    ngOnInit() {
        this.changePasswordForm = this.formBuilder.group({
            'newPassword': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
        })
    }

    changePassword(form) {
        if (form.valid) {
            this.updateSpinner = true;
            this._firebase.updatePassword(form.value['newPassword']).then((data) => {
                this.updateSpinner = false;
                this._viewCtrl.dismiss();
            }).catch((error) => {
                this.updateSpinner = false;
                this.errorMessage = error.message;
            });
        }
    }

    dismiss() {
        this._viewCtrl.dismiss();
    }

}