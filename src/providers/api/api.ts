import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiProvider {

  constructor(
    public httpClient: HttpClient,
    private http: Http) {

  }

  getWeatherKeyword(keyword: string) {
    return this.httpClient.get('http://api.openweathermap.org/data/2.5/weather?q=' + keyword + '&units=metric&APPID=ec44e7ff2e0597cf35d85dd13062e22d');
  }

  getWeatherCoordinates(lat: string, lon: string) {
    return this.httpClient.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=ec44e7ff2e0597cf35d85dd13062e22d');
  }

  getWeather16Days() {
    return this.httpClient.get('https://samples.openweathermap.org/data/2.5/forecast/daily?q=London&appid=ec44e7ff2e0597cf35d85dd13062e22d');
  }

  getCountries() {
    return this.httpClient.get('https://restcountries.eu/rest/v2/all');
  }

  getCities(keyword: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + keyword + '&types=(cities)&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms');
  }

  getPlacesList() {
    return this.httpClient.get('/assets/data/places.json');
  }

  getPlaceDetails(placeId: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms');
  }

  getPlacePhoto(photoreference: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms');
  }

  getPhotoString(photoreference: string) {
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms';
  }

  getDistanceFromHome(lat: string, lng: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=' + lat + ',' + lng + '&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms');
  }

  getDistance() {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=52.67698000000001,-7.20547&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms');
  }

  getName(){
    return this.httpClient.get('https://localhost:44304/api/todo');
  }
}
