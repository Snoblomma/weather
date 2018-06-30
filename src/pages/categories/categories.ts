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
  public colors: any = ["#9977B4", "#DD86B9", "#F497AA", "#F9B48A", "#FCD48E", "#FEF79F", "#C0DE96", "#95D4C1", "#81D2E3", "#87B8E1"];
  public categories: any = [
    { icon: "custom-coffee", name: "Coffee", color: "" },
    { icon: "custom-restaurant", name: "Restaurant", color: "" },
    { icon: "custom-playground", name: "Playground", color: "" },
    { icon: "custom-water", name: "Water", color: "" },
    { icon: "custom-beach", name: "Beach", color: "" },
    { icon: "custom-castle", name: "Castle", color: "" },
    { icon: "custom-airport", name: "Airport", color: "" },
    { icon: "custom-gym", name: "Gym", color: "" },
    { icon: "custom-mountain", name: "Mountain", color: "" },
    { icon: "custom-train", name: "Train Station", color: "" },
    { icon: "custom-forest", name: "Forest", color: "" },
    { icon: "custom-park", name: "Park", color: "" },
    { icon: "custom-picnic", name: "Picnic Spot", color: "" },
    { icon: "custom-pub", name: "Pub", color: "" },
    { icon: "custom-art", name: "Art", color: "" },
    { icon: "custom-zoopark", name: "Zoo", color: "" },
    { icon: "custom-historical", name: "Historical", color: "" },
    { icon: "custom-museum", name: "Museum", color: "" },
    { icon: "custom-cinema", name: "Cinema", color: "" },
    { icon: "custom-hike", name: "Hike", color: "" }];

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

      for (let index = 0; index < this.categories.length; index++) {
        this.categories[index].color = this.colors[index % this.colors.length];
      }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
