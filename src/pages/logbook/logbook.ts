import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { AddOperationPage } from '../add-operation/add-operation';
import { ReportCardPage } from '../report-card/report-card';
import { FirebaseService } from '../../providers/firebase/firebase-service';
@Component({
  selector: 'page-logbook',
  templateUrl: 'logbook.html'
})
export class LogbookPage implements OnInit {
  logbookLogs: any;
  searchLogText: string = '';
  logbookLogsApiData: any;
  userDetails: any;
  constructor(public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.userDetails = this._firebaseService.getLoggedUser();
    afoDatabase.list('/logs', {
      query: {
        orderByChild: 'uid',
        equalTo: this.userDetails['uid']
      }
    }).subscribe((res) => {
      this.logbookLogs = res;
      this.logbookLogsApiData = res;
    });
  }

  ngOnInit() { }

  searchLog(ev: any) {
    this.logbookLogs = this.logbookLogsApiData;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.logbookLogs = this.logbookLogs.filter((item) => {
        return (item['procedure'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  logSelected(logData) {
    let reportCardModel = this.modalCtrl.create(ReportCardPage, { 'logData': logData });
    reportCardModel.present();
  }

  onSearchCancel() {
    this.searchLogText = '';
    this.logbookLogs = this.logbookLogsApiData;
  }

  trackLogs(index, data) {
    return index;
  }

  addOperation() {
    let addOperationModel = this.modalCtrl.create(AddOperationPage);
    addOperationModel.present();
  }
}
