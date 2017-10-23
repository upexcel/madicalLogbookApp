import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { AddOperationPage } from '../add-operation/add-operation';

@Component({
  selector: 'page-logbook',
  templateUrl: 'logbook.html'
})
export class LogbookPage implements OnInit {
  logs: any;
  searchLogText: string = '';
  apiData: any;
  constructor(public afoDatabase: AngularFireOfflineDatabase, public navCtrl: NavController, public modalCtrl: ModalController) {
    afoDatabase.list('/logs').subscribe((res) => {
      this.logs = res;
      this.apiData = res;
    });
  }

  ngOnInit() { }

  searchLog(ev: any) {
    this.logs = this.apiData;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.logs = this.logs.filter((item) => {
        return (item['procedure'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  logSelected(logData) {
    console.log(logData)
  }

  onSearchCancel() {
    this.searchLogText = '';
    this.logs = this.apiData;
  }

  trackLogs(index, data)  {
    return index;
  }

  addOperation() {
    let addOperationModel = this.modalCtrl.create(AddOperationPage);
    addOperationModel.present();
  }
}
