import {Component, OnInit} from '@angular/core';
import {AfoListObservable, AngularFireOfflineDatabase} from 'angularfire2-offline/database';
import {FirebaseService} from '../../providers/firebase/firebase-service';
import forEach from 'lodash/forEach';
@Component({
    selector: 'page-to-learn',
    templateUrl: 'to-learn.html'
})
export class ToLearnPage implements OnInit {
    todos: any;
    todoDbSubscription: AfoListObservable<any[]>;
    userDetails: any;
    activeHeading = {
        all: true,
        remaining: false,
        completed: false
    };
    constructor(public afoDatabase: AngularFireOfflineDatabase, public _firebaseService: FirebaseService) {
        this.userDetails = this._firebaseService.getLoggedUser();
        this.todoDbSubscription = afoDatabase.list('/todos', {
            query: {
                orderByChild: 'uid',
                equalTo: this.userDetails['uid']
            }
        });
    }

    ngOnInit() {
        this.todoDbSubscription.subscribe((todos) => {
            this.todos = todos;
        })
    }
    active(ActiveHeadingName) {
        forEach(this.activeHeading, (value, key) => {
            if (key == ActiveHeadingName) {
                this.activeHeading[key] = true;
            } else {
                this.activeHeading[key] = false;
            }
        })
    }
    todoUpdate(todo) {
        this.todoDbSubscription.update(todo.$key, todo);
    }

    deleteTodo(todo) {
        this.todoDbSubscription.remove(todo.$key);
    }

    todoTrack(index, data) {
        return data['$key'] | index;
    }

}
