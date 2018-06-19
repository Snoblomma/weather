import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { PlacesPage } from '../pages/places/places';
import { AddPlacePage } from '../pages/add-place/add-place';
import { OptionsPage } from '../pages/options/options';
import { WeatherPage } from '../pages/weather/weather';
import { SettingsProvider } from './../providers/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PlacesPage;
  placesPage: any = PlacesPage;
  addPlacePage: any = AddPlacePage;
  optionsPage: any = OptionsPage;
  selectedTheme: String;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private settings: SettingsProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.pages = [
      { title: 'Places', component: PlacesPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
