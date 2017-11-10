import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController, ModalController} from 'ionic-angular';
import {AddOperationPage} from '../add-operation/add-operation';

@Component({
    selector: 'report-card',
    templateUrl: 'report-card.html'
})
export class ReportCardPage implements OnInit {
    logData: any;
    profileDetails: object | null;
    constructor(private _viewCtrl: ViewController, public params: NavParams, public modalCtrl: ModalController) {
        this.logData = params.get('logData');
    }

    ngOnInit() {}
    ionViewWillEnter() {
        this.profileDetails = JSON.parse(localStorage.getItem('profileDetails'));
    }
    getTimeDifference() {
        const startTime = this.logData['startTime'].split(':');
        const endTime = this.logData['endTime'].split(':');
        return `${(endTime[0] * 1 - startTime[0] * 1)}h : ${(endTime[1] * 1 - startTime[1] * 1)}m`;
    }

    dismiss() {
        this._viewCtrl.dismiss();
    }

    editLog() {
        let addOperationModel = this.modalCtrl.create(AddOperationPage, {editLogData: this.logData});
        addOperationModel.present().then(() => {
            this._viewCtrl.dismiss();
        });
    }
}
