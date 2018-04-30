import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  placeId: any;
  public lat: string;
  public lon: string;
  a: any;
  weathers: Observable<any>;
  placeDetails: Observable<any>;
  values: Array<any> = [];
  placeDetailsValues: Array<any> = [];
  res: Array<any> = [];
  t: any;
  private anyErrors: boolean;
  private finished: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiProvider: ApiProvider,) {
      this.placeId = this.navParams.get('placeId');
      this.initialize();
      // if (this.placeDetailsValues.length > 0) {
      //   this.lat = this.placeDetailsValues[0];
      //   this.lon = this.placeDetailsValues[1];
      // }

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  initialize(){
    this.placeDetails = this.apiProvider.getPlaceDetails(this.placeId);
    this.placeDetails.subscribe(
      value => this.placeDetailsValues.push(value.result.geometry.location.lat, value.result.geometry.location.lng),
      error => this.anyErrors = true,
      () => this.finished = true
    );
    

    // if(this.placeDetailsValues.length > 0) {
    //   this.res.push(this.placeDetailsValues[0]);
    //   // this.res.push(this.placeDetailsValues[0].result.geometry.location.lng);
    // }  


    

    

    this.weathers = this.apiProvider.getWeatherCoordinates(this.placeDetailsValues[0], this.placeDetailsValues[1]);
    this.weathers.subscribe(
      value => this.values.push(value),
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  print(a, b){
    this.lat =  a;
    this.lon = b;
  }

}
