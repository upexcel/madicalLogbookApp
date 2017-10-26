import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';

import { LogbookPage } from '../pages/logbook/logbook';
import { ToLearnPage } from '../pages/to-learn/to-learn';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatisticsPage } from '../pages/statistics/statistics';
import { SettingsPage } from '../pages/settings/settings';
import { AddOperationPage } from '../pages/add-operation/add-operation';
import { CheckCancel } from '../components/check-cancel/check-cancel';
import { config } from './app.config';
import { ReportCardPage } from '../pages/report-card/report-card';
import { RegistrationPage } from './../pages/registration/registration';
import { LoginPage } from './../pages/login/login';
import { EditSettingsPage } from '../pages/edit-settings/edit-settings';

import { FirebaseService } from '../providers/firebase/firebase-service';
import { HomeService } from '../providers/home/home-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LogbookPage,
    ToLearnPage,
    HomePage,
    TabsPage,
    StatisticsPage,
    SettingsPage,
    AddOperationPage,
    CheckCancel,
    ReportCardPage,
    RegistrationPage,
    LoginPage,
    EditSettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config['firebaseConfig']),
    AngularFireDatabaseModule,
    AngularFireOfflineModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LogbookPage,
    ToLearnPage,
    HomePage,
    TabsPage,
    StatisticsPage,
    SettingsPage,
    AddOperationPage,
    CheckCancel,
    ReportCardPage,
    RegistrationPage,
    LoginPage,
    EditSettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    FirebaseService,
    GooglePlus,
    HomeService
  ]
})
export class AppModule { }
