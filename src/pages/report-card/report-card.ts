import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'report-card',
  templateUrl: 'report-card.html'
})
export class ReportCardPage implements OnInit {
  logData: any;
  constructor(private _viewCtrl: ViewController, public params: NavParams) {
    this.logData = params.get('logData');
  }

  ngOnInit() { }

  getTimeDifference() {
    const startTime = this.logData['startTime'].split(':');
    const endTime = this.logData['endTime'].split(':');
    return `${(endTime[0] * 1 - startTime[0] * 1)}h : ${(endTime[1] * 1 - startTime[1] * 1)}m`;
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }
}
