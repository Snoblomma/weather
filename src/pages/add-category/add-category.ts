import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';
import { ApiProvider } from '../../providers/api/api';
import { CategoriesPage } from '../categories/categories';

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {
  public selectedTheme: string;
  public type: any;
  public name: any;
  public description: any;
  public resource_uri: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private settings: SettingsProvider,
    public apiProvider: ApiProvider) {
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
  }

  initialize() {
    this.type = this.navParams.get('type');
    if (this.type == "edit") {
      let category = this.navParams.get('category');
      this.name = category.name;
      this.description = category.description;
      this.resource_uri = category.resource_uri;
    }
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

  addCategory() {
    this.apiProvider.addCategory(this.name, this.description);
    this.navCtrl.setRoot(CategoriesPage);
  }

  updateCategory() {
    this.apiProvider.updateCategory(this.resource_uri, this.name, this.description);
    this.navCtrl.setRoot(CategoriesPage);
  }
}
