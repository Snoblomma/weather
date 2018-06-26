import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  public selectedTheme: string;
  public categories: any = [
    { icon: "rose", name: "Garden", color: "#a8e6cf" }, 
    { icon: "musical-notes", name: "Music", color: "#dcedc1" }];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private settings: SettingsProvider) {
    this.initialize();
  }

  ionViewDidLoad() {
  }

  initialize() {
    this.settings.getActiveTheme().subscribe(
      val => {
        if (val == "dark-theme") {
          this.selectedTheme = "dark-theme";
        }
        else {
          this.selectedTheme = "light-theme";
        }
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
