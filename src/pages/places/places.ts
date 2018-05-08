import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { PlaceDetailsPage } from '../place-details/place-details';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  private anyErrors: boolean;
  private finished: boolean;
  public images: Array<any> = [];
  public placesDecription: Array<{ name: string, placeId: string, image: string }>;
  public placesResult: Array<{ place: any, image: string, weather: any, distance: any }> = [];
  public placesResult2: Array<{ place: any, image: string, weather: any }> = [];
  public weathers: any;
  public distance: any;
  public lat: any;
  public lng: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider) {

    this.weathers = {
      clear_day: 'assets/imgs/weather-icons/weather-icons/clear_day.png',
      clear_night: 'assets/imgs/weather-icons/weather-icons/clear_night.png',
      cloudy: 'assets/imgs/weather-icons/weather-icons/cloudy.png',
      cloudy_snow: 'assets/imgs/weather-icons/weather-icons/cloudy_snow.png',
      drizzle: 'assets/imgs/weather-icons/weather-icons/drizzle.png',
      fog: 'assets/imgs/weather-icons/weather-icons/fog.png',
      fog_clear_day: 'assets/imgs/weather-icons/weather-icons/fog_clear_day.png',
      fog_clear_night: 'assets/imgs/weather-icons/weather-icons/fog_clear_night.png',
      fog_partly_cloudy: 'assets/imgs/weather-icons/weather-icons/fog_partly_cloudy.png',
      fog_partly_cloudy_day: 'assets/imgs/weather-icons/weather-icons/fog_partly_cloudy_day.png',
      fog_partly_cloudy_night: 'assets/imgs/weather-icons/weather-icons/fog_partly_cloudy_night.png',
      hail: 'assets/imgs/weather-icons/weather-icons/hail.png',
      hail_day: 'assets/imgs/weather-icons/weather-icons/hail_day.png',
      hail_night: 'assets/imgs/weather-icons/weather-icons/hail_night.png',
      light_rain: 'assets/imgs/weather-icons/weather-icons/light_rain.png',
      partly_cloudy_day: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_day.png',
      partly_cloudy_drizzle_day: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_drizzle_day.png',
      partly_cloudy_drizzle_night: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_drizzle_night.png',
      partly_cloudy_light_rain_day: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_light_rain_day.png',
      partly_cloudy_light_rain_night: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_light_rain_night.png',
      partly_cloudy_night: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_night.png',
      partly_cloudy_rainy: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_rainy.png',
      partly_cloudy_rainy_day: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_rainy_day.png',
      partly_cloudy_rainy_night: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_rainy_night.png',
      partly_cloudy_snow_day: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_snow_day.png',
      partly_cloudy_snow_night: 'assets/imgs/weather-icons/weather-icons/partly_cloudy_snow_night.png',
      thunder: 'assets/imgs/weather-icons/weather-icons/thunder.png',
      thunder_shower_day: 'assets/imgs/weather-icons/weather-icons/thunder_shower_day.png',
      thunder_shower_night: 'assets/imgs/weather-icons/weather-icons/thunder_shower_night.png',
      windy: 'assets/imgs/weather-icons/weather-icons/windy.png',
      windy_day: 'assets/imgs/weather-icons/weather-icons/windy_day.png',
      windy_night: 'assets/imgs/weather-icons/weather-icons/windy_night.png'
    };


    this.placesDecription = [
      { name: "Powerscourt", placeId: "ChIJp-IbAv2mZ0gRvIV9f0y-uz0", image: "string" },
      { name: "Newbridge", placeId: "ChIJYx2pjSMaZ0gRcG9LYqCuQII", image: "string" },
      { name: "Irish National Stud", placeId: "ChIJDYhC3dB4XUgR-WIfHkiJzhc", image: "string" },
      { name: "Glendalough", placeId: "ChIJFxLcsMuXZ0gRV-Gogyek8T0", image: "string" },
      { name: "Kilruddery House", placeId: "ChIJW2Vey4-oZ0gRNKiHuxIKtcc", image: "string" },
      { name: "Giants Causeway", placeId: "ChIJD48V9EQpYEgR0h_eGaCMIvM", image: "string" },
      { name: "Newgrange", placeId: "ChIJL-3aomI4Z0gRF4zQvv0Phcw", image: "string" }
    ];
    this.placesResult2 = [{
      place: "This is Place With Very Long Name", image: "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350", weather: this.weathers.fog_partly_cloudy_night
    }, {
      place: "This is Place Too", image: "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350", weather: this.weathers.hail_night
    }]
    this.getPlaces();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }

  getPlaces() {
    let placeDetails: any;
    this.placesDecription.forEach(element => {
      placeDetails = this.apiProvider.getPlaceDetails(element.placeId);
      placeDetails.subscribe(
        res => {
          var place: Array<any> = [];
          var photoreference = res.result.photos[0].photo_reference;
          this.lat = res.result.geometry.location.lat; 
          this.lng = res.result.geometry.location.lng; 
          var image = this.apiProvider.getPhotoString(photoreference);

          let t: any;
          t = this.apiProvider.getDistanceFromHome(this.lat, this.lng);
          t.subscribe(
            value => {
              this.distance = value.rows[0].elements[0].duration.text;
              var result: { place: any, image: string, weather: any, distance: any } = { place: res, image: image, weather: this.weathers.clear_night, distance: this.distance };
              this.placesResult.push(result);
            }
          );
        }
      );
    });
  }

  getPlaceDetails(result: any) {
    this.navCtrl.push(PlaceDetailsPage, {result: result});
  }
}
