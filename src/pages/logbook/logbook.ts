import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { AddOperationPage } from '../add-operation/add-operation';

@Component({
  selector: 'page-logbook',
  templateUrl: 'logbook.html'
})
export class LogbookPage implements OnInit {
  logbookLogs: any;
  searchLogText: string = '';
  logbookLogsApiData: any;
  constructor(public afoDatabase: AngularFireOfflineDatabase, public navCtrl: NavController, public modalCtrl: ModalController) {
    afoDatabase.list('/logs').subscribe((res) => {
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
    console.log(logData)
  }

  onSearchCancel() {
    this.searchLogText = '';
    this.logbookLogs = this.logbookLogsApiData;
  }

  trackLogs(index, data)  {
    return index;
  }

  addOperation() {
    let addOperationModel = this.modalCtrl.create(AddOperationPage);
    addOperationModel.present();
  }
}
