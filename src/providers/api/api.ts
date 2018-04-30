import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiProvider {

  constructor(
    public httpClient: HttpClient,
    private http:Http) {
    
  }

  getWeatherKeyword(keyword: string) {
    return this.httpClient.get('http://api.openweathermap.org/data/2.5/weather?q=' + keyword +'&units=metric&APPID=ec44e7ff2e0597cf35d85dd13062e22d');
  }

  getWeatherCoordinates(lat: string, lon: string) {
    return this.httpClient.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat+ '&lon=' + lon+ '&units=metric&APPID=ec44e7ff2e0597cf35d85dd13062e22d');
  }

  getCountries() {
    return this.httpClient.get('https://restcountries.eu/rest/v2/all');
  }

  getCities(keyword: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + keyword + '&types=(cities)&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms');
  }

  getPlaceDetails(placeId: string){
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId +'&key=AIzaSyBarlH0bIAdai_7JK2V-iGFKBO1tZCXSms');
  }
}
