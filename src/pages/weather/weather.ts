import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from './../../providers/api/api';
import { AlertController } from 'ionic-angular';
import { map } from 'rxjs/operators';

export class Article {
  
    constructor(
      public articleId: number,
      public articleSubject: string,
      public articleBody: string
    ){}
  
  }

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  placeId: any;
  public lat: any;
  public lng: any;
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
    public apiProvider: ApiProvider,
    private alertCtrl: AlertController) {
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
        this.presentAlert(this.lat);
        this.getWeather(this.lat, this.lng);
      }
    );
  }

  presentAlert(s: string) {
    let alert = this.alertCtrl.create({
      title: 'Lat',
      subTitle: s,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getWeather(lat: string, lng: string){
    this.weathers = this.apiProvider.getWeatherCoordinates(lat, lng);
    this.weathers.subscribe(
      value => this.values.push(value),
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

}
