import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  public selectedTheme: String;
  public theme: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(
      val => { this.selectedTheme = val; });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('dark-theme');
    } 
    else if (this.selectedTheme === 'light-theme') {
      this.settings.setActiveTheme('light-theme');
    }
  }
}
