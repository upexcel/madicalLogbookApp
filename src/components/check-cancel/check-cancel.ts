import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
    selector: 'check-cancel',
    templateUrl: 'check-cancel.html'
})
export class CheckCancel {
    constructor(private _viewCtrl: ViewController) {
    }
    ngOnInit() {
    }

    dismiss(check) {
        this._viewCtrl.dismiss(check);
    }

}