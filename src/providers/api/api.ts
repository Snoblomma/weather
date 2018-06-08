import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataStorageProvider } from '../data-storage/data-storage';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiProvider {

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private dataStorageProvider: DataStorageProvider) {
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
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + keyword + '&types=(cities)&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPlaces(keyword: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + keyword + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPlacesList() {
    return this.httpClient.get('/assets/data/places.json');
  }

  getPlacesListLocalBackend() {
    return this.httpClient.get('https://agile-springs-70240.herokuapp.com/api/place/');
  }

  getPlaceDetails(placeId: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPlacePhoto(photoreference: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPhotoString(photoreference: string) {
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw';
  }

  getDistanceFromHome(lat: string, lng: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=' + lat + ',' + lng + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getDistance() {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=52.67698000000001,-7.20547&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  addPlace(place_id, name, visited) {
    var data = {
      "place_id": place_id,
      "name": name,
      "visited": true
    };

    

    // this.httpClient.post('https://agile-springs-70240.herokuapp.com/api/place/', data).subscribe(
    //   value => console.log(value),
    //   error => console.log(error)
    // )
  }

  

  getResourceId(place_id){
    let k = this.dataStorageProvider.places;
    k.filter((item) => {
      if (item.place_id == place_id) {
        console.log("resource_uri " + item.place_id);
        return item.resource_uri;
      }
      return null;
    })
  }
}
