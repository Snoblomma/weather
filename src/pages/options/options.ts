import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  // public selectedTheme: String;
  public theme: String;
  public darkTheme: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(
      val => { 
        if(val == "dark-theme" ){
          this.darkTheme = true;
        }
        // this.selectedTheme = val; 
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  toggleAppTheme() {
    console.log(this.darkTheme == true);
    if (this.darkTheme == true) {
      this.settings.setActiveTheme('dark-theme');
    }
    else if (this.darkTheme == false) {
      this.settings.setActiveTheme('light-theme');
    }
  }
}
