import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddOperationPage } from '../add-operation/add-operation';
import { HomeService } from '../../providers/home/home-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  lineChart: any;
  homeData: any;
  homeSpinner: boolean = true;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public _homeService: HomeService) { }

  ngOnInit() {
    this._homeService.getHomePageData().then((homeData) => {
      this.homeSpinner = false;
      this.homeData = homeData;
    });
  }

  addOperation() {
    let addOperationModel = this.modalCtrl.create(AddOperationPage);
    addOperationModel.present();
    addOperationModel.onDidDismiss((data) => {
      if (data) {
        this.navCtrl.parent.select(2);
      }
    })
  }

  goToLogbook() {
    this.navCtrl.parent.select(2);
  }

}
