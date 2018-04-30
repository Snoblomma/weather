import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from './../../providers/api/api';
import { WeatherPage } from '../weather/weather';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  bla: any = '';
  bla2: any = '';
  items: Array<{title: string, note: string, icon: string}>;
  
  values: Array<any> = [];
  private anyErrors: boolean;
  private finished: boolean;
  items2: any = null;
  items3: Array<any> = [];
  countries: Array<any> = [];
  cities: Array<any> = [];
  cities2: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public httpClient: HttpClient,
    public apiProvider: ApiProvider,
    public modalCtrl: ModalController,) {
    // this.cities = this.apiProvider.getCities();
  }

  initializeItems(val: string){
    this.apiProvider.getCountries().subscribe(results => this.items2 = results);
    this.items3 = [];
    this.apiProvider.getCities(val).subscribe(
        value => this.items3.push(value), 
        error => this.anyErrors = true,
        () => this.finished = true
      );
  }

  getItems(ev) {
    var val = ev.target.value;

    this.initializeItems(val);

    if (val && val.trim() != '') {
      this.countries = this.items2.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getWeather(placeId, name){
    let modal = this.modalCtrl.create(WeatherPage, {placeId: placeId});
    modal.present();
  }
}
