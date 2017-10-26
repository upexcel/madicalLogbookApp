import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { config } from '../../app/app.config';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database'
import { FirebaseService } from '../../providers/firebase/firebase-service';

@Injectable()
export class HomeService {
    userDetails: any;
    constructor(public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase) {
        this.userDetails = this._firebaseService.getLoggedUser() || JSON.parse(localStorage.getItem('userDetails'));
    }

    getHomePageData() {
        return new Promise((resolve, reject) => {
            const homeData = {
                scrubbedIn: 0,
                totalTimeInSurgery: 0,
                totalOperations: 0
            };
            this.afoDatabase.list('/logs', {
                query: {
                    orderByChild: 'uid',
                    equalTo: this.userDetails['uid']
                }
            }).subscribe((res) => {
                homeData['totalOperations'] = res.length;
                let scrubbedIn = 0;
                let totalTimeInSurgery = 0;
                res.forEach(log => {
                    if (log['scrubbedIn']) {
                        scrubbedIn += 1;
                    }
                    totalTimeInSurgery += this.getTimeDifference(log)
                });
                homeData['scrubbedIn'] = scrubbedIn;
                homeData['totalTimeInSurgery'] = Math.ceil(totalTimeInSurgery / 60);
                resolve(homeData)
            }, (err) => {
                resolve(homeData)
            });
        })
    }

    getTimeDifference(log) {
        const startTime = log['startTime'].split(':');
        const endTime = log['endTime'].split(':');
        return ((endTime[0] * 1 - startTime[0] * 1) * 60) + (endTime[1] * 1 - startTime[1] * 1);
    }

}
