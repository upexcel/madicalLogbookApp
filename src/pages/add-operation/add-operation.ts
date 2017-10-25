import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController, NavController, PopoverController } from 'ionic-angular';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { CheckCancel } from '../../components/check-cancel/check-cancel';
import { FirebaseService } from '../../providers/firebase/firebase-service';

@Component({
  selector: 'page-add-operation',
  templateUrl: 'add-operation.html'
})
export class AddOperationPage implements OnInit {
  @ViewChild('addOperationSlider') addOperationSlider: any;
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;
  slideFourForm: FormGroup;
  count: number = 0;
  assistance: string = 'Observed';
  specificTaskList = [];
  thingsToLookUp = [];
  logs: AfoListObservable<any[]>;
  userDetails: any;
  constructor(public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase, public popoverCtrl: PopoverController, public viewCtrl: ViewController, public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.logs = afoDatabase.list('/logs');
    this.userDetails = this._firebaseService.getLoggedUser();
  }

  ngOnInit() {
    this.addOperationSlider.lockSwipes(true);
    this.slideOneForm = this.formBuilder.group({
      date: ['', Validators.compose([Validators.required])],
      patientNumber: ['', Validators.compose([Validators.required])],
      supervisor: ['', Validators.compose([Validators.required])]
    });
    this.slideTwoForm = this.formBuilder.group({
      speciality: ['', Validators.compose([Validators.required])],
      procedure: ['', Validators.compose([Validators.required])],
      startTime: ['', Validators.compose([Validators.required])],
      endTime: ['', Validators.compose([Validators.required])]
    });
    this.slideThreeForm = this.formBuilder.group({
      scrubbedIn: [false, Validators.compose([Validators.required])]
    });
    this.slideFourForm = this.formBuilder.group({
      rememberText: ['', Validators.compose([Validators.required])]
    });
  }

  next() {
    ++this.count;
    this.addOperationSlider.lockSwipes(false);
    this.addOperationSlider.slideNext();
    this.addOperationSlider.lockSwipes(true);
    this.addOperationSlider.resize();
  }

  prev() {
    --this.count;
    this.addOperationSlider.lockSwipes(false);
    this.addOperationSlider.slidePrev();
    this.addOperationSlider.lockSwipes(true);
    this.addOperationSlider.resize();
  }

  taskDo(value) {
    this.assistance = value;
  }

  addSpecificTask(task) {
    this.specificTaskList.push(task);
  }

  addsingleThingToLookUp(thing) {
    this.thingsToLookUp.push(thing);
  }

  save() {
    const apiLogData = {
      date: this.slideOneForm.value['date'],
      patientNumber: this.slideOneForm.value['patientNumber'],
      supervisor: this.slideOneForm.value['supervisor'],
      endTime: this.slideTwoForm.value['endTime'],
      procedure: this.slideTwoForm.value['procedure'],
      speciality: this.slideTwoForm.value['speciality'],
      startTime: this.slideTwoForm.value['startTime'],
      scrubbedIn: this.slideThreeForm.value['scrubbedIn'],
      assistance: this.assistance,
      specificTaskList: this.specificTaskList,
      rememberText: this.slideFourForm.value['rememberText'],
      thingsToLookUp: this.thingsToLookUp,
      uid: this.userDetails['uid']
    }
    this.logs.push(apiLogData);
    this.viewCtrl.dismiss(true);
  }

  cancel() {
    if (this.count || this.slideOneForm.valid) {
      let popover = this.popoverCtrl.create(CheckCancel);
      popover.present();
      popover.onDidDismiss((data) => {
        if (data) {
          this.viewCtrl.dismiss(false);
        }
      })
    } else {
      this.viewCtrl.dismiss(false);
    }
  }

}
