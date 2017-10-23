import {Component, OnInit} from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddOperationPage } from '../add-operation/add-operation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public modalCtrl: ModalController) {

  }

  ngOnInit() {}

  addOperation() {
    let addOperationModel = this.modalCtrl.create(AddOperationPage);
    addOperationModel.present();
  }

}
