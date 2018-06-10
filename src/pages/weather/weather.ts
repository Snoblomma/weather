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
  picToView: any;
  photoreference: any;
  weathers: Observable<any>;
  placeDetails: Observable<any>;
  values: Array<any> = [];
  placeDetailsValues: Array<any> = [];
  f: string = "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";
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
        this.photoreference = res.result.photos[0].photo_reference;
        this.getWeather(this.lat, this.lng);    
        // this.getPhoto(this.photoreference); 
        this.picToView = this.apiProvider.getPhotoString(this.photoreference);
        this.f = this.picToView;
      }
    );
    //this.setBackground();
  }

  getWeather(lat: string, lng: string){
    this.weathers = this.apiProvider.getWeatherCoordinates(lat, lng);
    this.weathers.subscribe(
      value => {
        console.log(value);
        this.counrty = value.location.country;
        this.description = value.current.condition.text;
        this.temperature = value.current.temp_c;
        this.humidity = value.current.humidity;
        this.wind = value.current.wind_kph;},
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  getPhoto(photoreference: string){
    this.apiProvider.getPlacePhoto(photoreference).subscribe(
      value => {
        this.picToView = value;},
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  setBackground(){
    document.getElementById('content').style.backgroundColor = 'red'; 
  }
}
