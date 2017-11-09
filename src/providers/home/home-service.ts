import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {config} from '../../app/app.config';
import {AngularFireOfflineDatabase} from 'angularfire2-offline/database'
import {FirebaseService} from '../../providers/firebase/firebase-service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class HomeService {
    userDetails: any;
    constructor(public _firebaseService: FirebaseService, public afoDatabase: AngularFireOfflineDatabase) {}

    getHomePageData(year?) {
        this.userDetails = this._firebaseService.getLoggedUser() || JSON.parse(localStorage.getItem('userDetails'));
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
                homeData['chartData'] = year && year > 1 ? this.getChartDataViaYear(res, year) : this.getChartData(res);
                homeData['favouriteSpecialities'] = this.getFavouriteSpecialities(res);
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

    getFavouriteSpecialities(res) {
        const newData = _.groupBy(res, 'speciality');
        let data = [];
        _.forEach(newData, (value, key) => {
            const index = _.findIndex(config['specialityList'], {'value': key});
            let totalTimeInSurgery = 0;
            _.forEach(value, (value1, key1) => {
                totalTimeInSurgery += this.getTimeDifference(value1);
            })
            data.push({
                showData: config['specialityList'][index],
                totalOperation: value.length,
                totalTimeInSurgery: Math.ceil(totalTimeInSurgery / 60)
            })
        })
        let order = _.orderBy(data, 'totalOperation', 'desc')
        return order;
    }

    getChartData(data) {
        const logsData = JSON.parse(JSON.stringify(data));
        _.forEach(logsData, (value, key) => {
            value['MonthYear'] = moment(value['date']).format('M/YYYY')
        })
        const newData = _.groupBy(logsData, 'MonthYear');
        _.forEach(newData, (value, key) => {
            let totalTimeInSurgery = 0;
            _.forEach(value, (value1, key1) => {
                totalTimeInSurgery += this.getTimeDifference(value1);
            })
            newData[key] = Math.ceil(totalTimeInSurgery / 60);
        })
        let months = [];
        for (var i = 0; i <= 11; i++) {
            months.push({
                MonthYear: moment().subtract(i, 'month').format('M/YYYY'),
                lable: moment().subtract(i, 'month').format('MMM'),
                count: 0
            })
        }
        months = months.reverse();
        const finalData = {
            labels: [],
            data: []
        }
        _.forEach(months, (value, key) => {
            finalData.labels.push(value['lable'])
            finalData.data.push(newData[value.MonthYear] || 0)
        })
        return finalData;
    }
    getChartDataViaYear(data, year) {
        const logsData = JSON.parse(JSON.stringify(data));
        console.log("logsData", logsData)
        _.forEach(logsData, (value, key) => {
            value['Year'] = moment(value['date']).format('YYYY')
        })
        const newData = _.groupBy(logsData, 'Year');
        _.forEach(newData, (value, key) => {
            let totalTimeInSurgery = 0;
            _.forEach(value, (value1, key1) => {
                totalTimeInSurgery += this.getTimeDifference(value1);
            })
            newData[key] = Math.ceil(totalTimeInSurgery / 60);
        })
        console.log(newData)
        let years = [];
        for (var i = 0; i < year; i++) {
            years.push({
                Year: moment().subtract(i, 'year').format('YYYY'),
                lable: moment().subtract(i, 'year').format('YYYY'),
                count: 0
            })
        }
        years = years.reverse();
        const finalData = {
            labels: [],
            data: []
        }
        _.forEach(years, (value, key) => {
            finalData.labels.push(value['lable'])
            finalData.data.push(newData[value.Year] || 0)
        })
        return finalData;
    }
}
