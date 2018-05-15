import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetailsPage {
  public placeName: any = "-";
  public placeId: any;
  public result: any = "";
  public image: string = "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";
  public rating: any = "-";
  public drive: any = "-";
  public photoreference: any;
  public openingHours: any = '';
  public types: any = '';
  public images: Array<any> = [];
  lat: any;
  lng: any;
  counrty: any;
  description: any;
  temperature: any;
  humidity: any;
  wind: any;
  weathers: Observable<any>;
  placeDetails: Observable<any>;
  private anyErrors: boolean;
  private finished: boolean;
  r: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider) {
    //this.placeName = this.navParams.get('placeName');
    this.result = this.navParams.get('result');
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailsPage');
  }

  initialize() {
    //this.images.push(this.image);
    //this.images.push(this.image);
    this.getWeathers();
    this.getComponents();
    this.getImage();
  }

  getWeathers(){
    this.placeId = this.result.place.result.place_id;
    this.placeDetails = this.apiProvider.getPlaceDetails(this.placeId);
    this.placeDetails.subscribe(
      res => { 
        this.lat = res.result.geometry.location.lat; 
        this.lng = res.result.geometry.location.lng; 
        this.photoreference = res.result.photos[0].photo_reference;
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

    var y = this.apiProvider.getWeather16Days();
    y.subscribe(
      value => {
        this.r = value;
      },
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  getComponents() {
    if (this.result['place']) {
      this.photoreference = this.result.place.result.photos[0].photo_reference;
      this.placeName = this.result.place.result.name;
      this.rating = this.result.place.result.rating;
      this.drive = this.result.distance;
      if (this.result.place.result['opening_hours']) {
        this.openingHours = this.result.place.result.opening_hours.weekday_text;
      }
      if (this.result.place.result['types']) {
        this.types = this.result.place.result.types;
      }

    }
  }

  getImage() {
    if (this.result['place']) {
      var max = this.result.place.result.photos.length;
      max = max < 10 ? max : 10
      for (var index = 0; index < max; index++) {
        var photoreference = this.result.place.result.photos[index].photo_reference;
        this.image = this.apiProvider.getPhotoString(photoreference);
        var t = this.apiProvider.getPhotoString(photoreference);
        this.images.push(this.image);
      }
    }
  }
}
