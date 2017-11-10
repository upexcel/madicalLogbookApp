import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {GooglePlus} from '@ionic-native/google-plus';
import {Platform} from 'ionic-angular';
import {config} from '../../app/app.config';

@Injectable()
export class FirebaseService {
    user: Observable<firebase.User>;
    userDetails: firebase.User = null;
    constructor(public platform: Platform, private googlePlus: GooglePlus, private _firebaseAuth: AngularFireAuth) {
        this.user = _firebaseAuth.authState;
        this.user.subscribe((user) => {
            if (user) {
                this.userDetails = user;
                localStorage.setItem('userDetails', JSON.stringify(user));
            } else {
                localStorage.removeItem('loginType');
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

    updatePassword(newPassword) {
        return this.userDetails.updatePassword(newPassword);
    }

    getLoggedUser() {
        if (this.userDetails == null) {
            return false;
        } else {
            return this.userDetails;
        }
    }

    logout() {
        localStorage.removeItem('loginType');
        return this._firebaseAuth.auth.signOut();
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

    loginWithGoogle(navCtrl) {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                this.googlePlus.login({
                    'scopes': '',
                    'webClientId': config.googleWebClientId,
                    'offline': true,
                }).then((success) => {
                    const googleCredential = firebase.auth.GoogleAuthProvider.credential(success.idToken, null);
                    firebase.auth().signInWithCredential(googleCredential).catch((err) => {
                        reject(err);
                    }).then((user) => {
                        localStorage.setItem('userDetails', JSON.stringify(user));
                        resolve(user);
                    })
                }).catch((error) => {
                    reject(error);
                })
            } else {
                reject('Please run me on a device');
            }
        });
    }

    facebooklogin() {
        // return Facebook.login(['email', 'public_profile']).then(res => {
        //     const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        //     return firebase.auth().signInWithCredential(facebookCredential);
        // });
    }
}
