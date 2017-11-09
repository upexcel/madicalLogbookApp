import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ViewController, NavController, PopoverController, NavParams} from 'ionic-angular';
import {AfoListObservable, AngularFireOfflineDatabase} from 'angularfire2-offline/database';
import {CheckCancel} from '../../components/check-cancel/check-cancel';
import {FirebaseService} from '../../providers/firebase/firebase-service';
import {config} from '../../app/app.config';
import * as _ from 'lodash';
import filter from 'lodash/filter';
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
    todos: AfoListObservable<any[]>;
    userDetails: any;
    editLogData: any;
    currentYear: number;
    specialityList = config.specialityList;
    constructor(public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase, public popoverCtrl: PopoverController, public viewCtrl: ViewController, public navCtrl: NavController, public formBuilder: FormBuilder, public params: NavParams) {
        this.logs = afoDatabase.list('/logs');
        this.todos = afoDatabase.list('/todos');
        this.userDetails = this._firebaseService.getLoggedUser();
        this.editLogData = params.get('editLogData');
        const dateObj = new Date();
        this.currentYear = dateObj.getFullYear();
    }

    ngOnInit() {
        this.addOperationSlider.lockSwipes(true);
        if (this.editLogData) {
            this.slideOneForm = this.formBuilder.group({
                date: [this.editLogData['date'], Validators.compose([Validators.required])],
                patientNumber: [this.editLogData['patientNumber']],
                supervisor: [this.editLogData['supervisor']]
            });
            this.slideTwoForm = this.formBuilder.group({
                speciality: [this.editLogData['speciality'], Validators.compose([Validators.required])],
                procedure: [this.editLogData['procedure'], Validators.compose([Validators.required])],
                startTime: [this.editLogData['startTime'], Validators.compose([Validators.required])],
                endTime: [this.editLogData['endTime'], Validators.compose([Validators.required])]
            });
            this.slideThreeForm = this.formBuilder.group({
                scrubbedIn: [this.editLogData['scrubbedIn']]
            });
            this.slideFourForm = this.formBuilder.group({
                rememberText: [this.editLogData['rememberText']]
            });
            this.assistance = this.editLogData['assistance'];
            this.specificTaskList = this.editLogData['specificTaskList'] || [];
            this.thingsToLookUp = this.editLogData['thingsToLookUp'] || [];
        } else {
            this.slideOneForm = this.formBuilder.group({
                date: ['', Validators.compose([Validators.required])],
                patientNumber: [''],
                supervisor: ['']
            });
            this.slideTwoForm = this.formBuilder.group({
                speciality: ['', Validators.compose([Validators.required])],
                procedure: ['', Validators.compose([Validators.required])],
                startTime: ['', Validators.compose([Validators.required])],
                endTime: ['', Validators.compose([Validators.required])]
            });
            this.slideThreeForm = this.formBuilder.group({
                scrubbedIn: [false]
            });
            this.slideFourForm = this.formBuilder.group({
                rememberText: ['']
            });
        }
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
        let filterName = {};
        filterName['value'] = this.slideTwoForm.value['speciality'];
        let name = filter(this.specialityList, filterName)[0].name;
        const apiLogData = {
            date: this.slideOneForm.value['date'],
            patientNumber: this.slideOneForm.value['patientNumber'],
            supervisor: this.slideOneForm.value['supervisor'],
            endTime: this.slideTwoForm.value['endTime'],
            procedure: this.slideTwoForm.value['procedure'],
            speciality: this.slideTwoForm.value['speciality'],
            specialitName: name,
            startTime: this.slideTwoForm.value['startTime'],
            scrubbedIn: this.slideThreeForm.value['scrubbedIn'],
            assistance: this.assistance,
            specificTaskList: this.specificTaskList,
            rememberText: this.slideFourForm.value['rememberText'],
            thingsToLookUp: this.thingsToLookUp,
            uid: this.userDetails['uid']
        }
        if (this.editLogData) {
            this.logs.update(this.editLogData['$key'], apiLogData);
        } else {
            this.logs.push(apiLogData);
            this.addTodos(this.thingsToLookUp)
        }
        this.viewCtrl.dismiss(true);
    }

    addTodos(todos) {
        todos = todos.reverse();
        _.forEach(todos, (val, key) => {
            this.todos.push({
                todo: val,
                completed: false,
                date: new Date().toString(),
                uid: this.userDetails['uid'],
                speciality: this.slideTwoForm.value['speciality'],
            })
        })
    }

    preventBlur(event) {
        event.preventDefault();
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
