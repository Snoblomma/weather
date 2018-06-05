import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from './../../providers/api/api';
import { WeatherPage } from '../weather/weather';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

import { map } from 'rxjs/operators'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private anyErrors: boolean;
  private finished: boolean;

  value: any;
  notes: any;
  name: any;
  t: any;
  items3: Array<any> = [];
  i: Array<{ id: string }>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public apiProvider: ApiProvider,
    private nativeStorage: NativeStorage,
    private storage: Storage) {
    this.i = [
      { id: 'countryBar' },
      { id: 'weatherBar' },
      { id: 'tempBar' },
      { id: 'humBar' },
      { id: 'windBar' }];
    this.initialize();
  }

  initialize() {
    this.getName();
    this.getNotes();
  }

  plusOne() {

    this.storage.get('name').then(
      data => this.value = data,
      error => console.error(error)
    );

    if (this.value == null){
      this.value = 'bla';
      this.storage.set('name', this.value);
    }
    else{this.value
      this.value = this.value + '1'
      this.storage.set('name', this.value);
    }

    this.storage.get('name').then(
      data => this.value = data,
      error => console.error(error)
    );
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

  getName(){
    this.t = this.apiProvider.getName();
    this.t.subscribe(
      res => {
        this.name = res.name;
      }
    );
  }

  getNotes(){
    this.t = this.apiProvider.getNotes();
    this.t.subscribe(
      res => {
        console.log(res['objects']);
        this.notes = res['objects'];
      }
    );
  }
}
