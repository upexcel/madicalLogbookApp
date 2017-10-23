import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Component({
  selector: 'page-logbook',
  templateUrl: 'logbook.html'
})
export class LogbookPage implements OnInit {
  logs: AfoListObservable<any[]>;
  constructor(afoDatabase: AngularFireOfflineDatabase, public navCtrl: NavController) {
    this.logs = afoDatabase.list('/logs');
  }

  ngOnInit() {}

}
