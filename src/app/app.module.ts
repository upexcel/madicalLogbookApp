import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
    ReportCardPage
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
    ReportCardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
