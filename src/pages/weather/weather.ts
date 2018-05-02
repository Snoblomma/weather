import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from './../../providers/api/api';
import { AlertController } from 'ionic-angular';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  placeName: any;
  placeId: any;
  lat: any;
  lng: any;
  counrty: any;
  description: any;
  temperature: any;
  humidity: any;
  wind: any;
  weathers: Observable<any>;
  placeDetails: Observable<any>;
  values: Array<any> = [];
  placeDetailsValues: Array<any> = [];
  private anyErrors: boolean;
  private finished: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    private alertCtrl: AlertController) {
      this.placeName = this.navParams.get('placeName');
      this.placeId = this.navParams.get('placeId');
      this.initialize();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  initialize(){
    this.placeDetails = this.apiProvider.getPlaceDetails(this.placeId);
    this.placeDetails.subscribe(
      res => { 
        this.lat = res.result.geometry.location.lat; 
        this.lng = res.result.geometry.location.lng; 
        this.getWeather(this.lat, this.lng);
      }
    );
  }

  getWeather(lat: string, lng: string){
    this.weathers = this.apiProvider.getWeatherCoordinates(lat, lng);
    this.weathers.subscribe(
      value => {
        this.counrty = value.sys.country;
        this.description = value.weather[0].description;
        this.temperature = value.main.temp;
        this.humidity = value.main.humidity;
        this.wind = value.wind.speed;},
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }
}
