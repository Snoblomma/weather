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


  presentAlert(s: any) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: s,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  initializeItems(ev){
    this.apiProvider.getCountries().subscribe(results => this.items2 = results);
    // this.apiProvider.getCities().subscribe(results => this.items3 = results);
    this.items3 = [];
    this.apiProvider.getCities(ev).subscribe(
        value => this.items3.push(value), 
        error => this.anyErrors = true,
        () => this.finished = true
      );
  }

  getItems(ev) {
    // console.log("before " +this.items3.length);
    // Reset items back to all of the items
    this.initializeItems(ev);

    // set val to the value of the ev target
    var val = ev.target.value;
    console.log("val " +val);

  //  if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.countries = this.items2.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    this.presentAlert(this.items3[0].predictions[0].description);

    if(this.items3 != null){
      // this.cities2 = this.items3[0].predictions;
      if(this.items3.length > 0){
        this.cities2 = this.items3[0];
      }

        // if (val && val.trim() != '') {
        //   this.cities2 = this.items3.filter((item) => {
        //     return (item.predictions[0].description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //   })
        // }
    }
    // console.log("after " +this.items3.length);
    
  }
}
