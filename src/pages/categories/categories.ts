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
    { icon: "custom-coffee", name: "Coffee", color: "#a8e6cf" }, 
    { icon: "custom-restaurant", name: "Restaurant", color: "#dcedc1" },
    { icon: "custom-playground", name: "Playground", color: "#dcedc1" },
    { icon: "custom-water", name: "Water", color: "#dcedc1" },
    { icon: "custom-beach", name: "Beach", color: "#dcedc1" },
    { icon: "custom-castle", name: "Castle", color: "#ffd3b6" },
    { icon: "custom-airport", name: "Airport", color: "#ffd3b6" },
    { icon: "custom-gym", name: "Gym", color: "#ffd3b6" },
    { icon: "custom-train", name: "Train Station", color: "#ffd3b6" }];

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
