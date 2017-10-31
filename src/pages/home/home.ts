import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddOperationPage } from '../add-operation/add-operation';
import { HomeService } from '../../providers/home/home-service';
import { Chart } from 'chart.js';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  homeData: any;
  homeSpinner: boolean = true;
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public _homeService: HomeService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this._homeService.getHomePageData().then((homeData: any) => {
      this.homeSpinner = false;
      this.homeData = homeData;
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: homeData.chartData.labels,
          datasets: [
            {
              label: "Theatre Time (Last 12 months)",
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointBorderColor: "rgba(75,192,192,1)",
              pointRadius: 1,
              data: homeData.chartData.data
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                callback: (value, index, values) => {
                  return `${value}h`;
                }
              }
            }]
          }
        }
      });
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
