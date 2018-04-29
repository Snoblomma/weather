import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from './../../providers/api/api';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  bla: any = '';
  bla2: any = '';
  items: Array<{title: string, note: string, icon: string}>;
  weathers: Observable<any>;
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
    private alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item');

    // this.weathers = this.apiProvider.getWeather();
    // let subscription = this.weathers.subscribe(
    //   value => this.values.push(value),
    //   error => this.anyErrors = true,
    //   () => this.finished = true
    // );

    // this.cities = this.apiProvider.getCities();
    
    this.initializeItems("");
  }

  initializeItems(ev: string){
    this.apiProvider.getCountries().subscribe(results => this.items2 = results);
    this.items3 = [];
    this.apiProvider.getCities(ev).subscribe(
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
}
