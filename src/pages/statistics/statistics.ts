import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { HomeService } from '../../providers/home/home-service';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage implements OnInit {
  statisticsData: any;
  statisticsSpinner: boolean = true;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public _homeService: HomeService) { }

  ngOnInit() {
    this._homeService.getHomePageData().then((statisticsData) => {
      this.statisticsSpinner = false;
      this.statisticsData = statisticsData;
    });
  }

}
