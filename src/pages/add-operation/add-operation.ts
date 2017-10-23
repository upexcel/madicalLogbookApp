import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController, NavController, Content, PopoverController } from 'ionic-angular';
import { CheckCancel } from '../../components/check-cancel/check-cancel';

@Component({
  selector: 'page-add-operation',
  templateUrl: 'add-operation.html'
})
export class AddOperationPage implements OnInit {
  @ViewChild('addOperationSlider') addOperationSlider: any;
  @ViewChild(Content) content: Content;
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;
  slideFourForm: FormGroup;
  count: number = 0;
  task: string = 'Observed';
  specificTaskList = [];
  thingsToLookUp = [];
  constructor(public popoverCtrl: PopoverController, public viewCtrl: ViewController, public navCtrl: NavController, public formBuilder: FormBuilder) {
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
    this.task = value;
  }

  addSpecificTask(task) {
    this.specificTaskList.push(task);
  }

  addsingleThingToLookUp(thing) {
    this.thingsToLookUp.push(thing);
  }

  save() {
    console.log(this.slideOneForm.value)
    console.log(this.slideTwoForm.value)
    console.log(this.slideThreeForm.value)
    console.log(this.slideFourForm.value)
    console.log(this.thingsToLookUp);
    console.log(this.specificTaskList);
    
  }

  cancel() {
    if (this.count || this.slideOneForm.valid) {
      let popover = this.popoverCtrl.create(CheckCancel);
      popover.present();
      popover.onDidDismiss((data) => {
        if (data) {
          this.viewCtrl.dismiss();
        }
      })
    } else {
      this.viewCtrl.dismiss();
    }
  }

}
