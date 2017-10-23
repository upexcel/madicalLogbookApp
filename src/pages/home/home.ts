import {Component, OnInit} from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddOperationPage } from '../add-operation/add-operation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {}

  ngOnInit() {}

  addOperation() {
    let addOperationModel = this.modalCtrl.create(AddOperationPage);
    addOperationModel.present();
    addOperationModel.onDidDismiss((data)=> {
      if (data) {
        this.navCtrl.parent.select(2);
      }
    })
  }

}
