import {Component, OnInit} from '@angular/core';

import { LogbookPage } from '../logbook/logbook';
import { ToLearnPage } from '../to-learn/to-learn';
import { HomePage } from '../home/home';
import { StatisticsPage } from '../statistics/statistics';
import { SettingsPage } from '../settings/settings';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HomePage;
  tab2Root = ToLearnPage;
  tab3Root = LogbookPage;
  tab4Root = StatisticsPage;
  tab5Root = SettingsPage;

  constructor() {

  }

  ngOnInit() {}
}
