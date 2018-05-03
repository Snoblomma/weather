import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from './../../providers/api/api';
import { WeatherPage } from '../weather/weather';

import { map } from 'rxjs/operators'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private anyErrors: boolean;
  private finished: boolean;
  
  items3: Array<any> = [];
  i: Array<{ id: string }>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public apiProvider: ApiProvider) {
    this.i = [
      { id: 'countryBar' },
      { id: 'weatherBar' },
      { id: 'tempBar' },
      { id: 'humBar' },
      { id: 'windBar' }];
  }

  getItems(ev) {
    var val = ev.target.value;

    this.items3 = [];
    this.apiProvider.getCities(val).subscribe(
      value => this.items3.push(value),
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  getWeather(placeId, placeName) {
    this.navCtrl.push(WeatherPage, { placeId: placeId, placeName: placeName });
  }
}
