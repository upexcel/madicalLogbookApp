import { Component, OnInit } from '@angular/core';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { FirebaseService } from '../../providers/firebase/firebase-service';

@Component({
  selector: 'page-to-learn',
  templateUrl: 'to-learn.html'
})
export class ToLearnPage implements OnInit {
  todos: any;
  todoDbSubscription: AfoListObservable<any[]>;
  userDetails: any;
  activeHeading = false;
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
