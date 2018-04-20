import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from './../../providers/api/api';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  bla: any = '';
  bla2: any = '';
  items: Array<{title: string, note: string, icon: string}>;
  weathers: Observable<any>;
  values: Array<any> = [];
  countries:any[] = [];
  private anyErrors: boolean;
  private finished: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public httpClient: HttpClient,
    public apiProvider: ApiProvider) {
    this.selectedItem = navParams.get('item');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.bla = this.items.pop().note;

    this.weathers = this.apiProvider.getWeather();
    this.weathers.subscribe(countries => this.countries = countries);
    let subscription = this.weathers.subscribe(
      value => this.values.push(value),
      error => this.anyErrors = true,
      () => this.finished = true
    );

  

    if(this.values.length > 0){
      this.bla2 = this.values. pop().description;
    }
    
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
