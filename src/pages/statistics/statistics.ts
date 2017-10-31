import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { HomeService } from '../../providers/home/home-service';
import { Chart } from 'chart.js';
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage implements OnInit {
  statisticsData: any;
  statisticsSpinner: boolean = true;
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public _homeService: HomeService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this._homeService.getHomePageData().then((statisticsData: any) => {
      this.statisticsSpinner = false;
      this.statisticsData = statisticsData;
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: statisticsData.chartData.labels,
          datasets: [
            {
              label: "Theatre Time (Last 12 months)",
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointBorderColor: "rgba(75,192,192,1)",
              pointRadius: 1,
              data: statisticsData.chartData.data
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

}
