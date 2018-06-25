import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';
import { CategoriesPage } from '../categories/categories';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  public theme: String;
  public darkTheme: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private settings: SettingsProvider,
    private modalCtrl: ModalController,) {
    this.settings.getActiveTheme().subscribe(
      val => { 
        if(val == "dark-theme" ){
          this.darkTheme = true;
        }
      });
  }

  ionViewDidLoad() {
  }

  toggleAppTheme() {
    if (this.darkTheme == true) {
      this.settings.setActiveTheme('dark-theme');
    }
    else if (this.darkTheme == false) {
      this.settings.setActiveTheme('light-theme');
    }
  }

  editCategories(){
    let modal = this.modalCtrl.create(CategoriesPage, { });
    modal.onDidDismiss(data => {
      if (data != null) {
        console.log(data);
      }
    });
    modal.present();
  }
}
