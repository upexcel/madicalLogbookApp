import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {
    user: Observable<firebase.User>;
    userDetails: firebase.User = null;
    constructor(private _firebaseAuth: AngularFireAuth) {
        this.user = _firebaseAuth.authState;
        this.user.subscribe((user) => {
            if (user) {
                this.userDetails = user;
                localStorage.setItem('userDetails', JSON.stringify(user));
            } else {
                localStorage.removeItem('userDetails');
                this.userDetails = null;
            }
        });
    }

    isLoggedIn() {
        if (this.userDetails == null && localStorage.getItem('userDetails') == null) {
            return false;
        } else {
            return true;
        }
    }

    logout() {
        this._firebaseAuth.auth.signOut();
    }

    loginUserWithEmailPassword(email, password) {
        return new Promise((resolve, reject) => {
            this._firebaseAuth.auth.signInWithEmailAndPassword(email, password).catch((err) => {
                console.log(err)
                reject(err);
            }).then((user) => {
                localStorage.setItem('userDetails', JSON.stringify(user));
                resolve(user);
            })
        })
    }

    createUserWithEmailPassword(email, password) {
        return new Promise((resolve, reject) => {
            return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password).catch((error) => {
                console.log(error)
                reject(error);
            }).then((user) => {
                if (user) {
                    this.loginUserWithEmailPassword(email, password).then((user) => {
                        resolve(user)
                    }, (err) => {
                        console.log(err)
                        reject(err)
                    })
                }
            });
        })
    }
}
