import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataStorageProvider } from '../data-storage/data-storage';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiProvider {
  public placeDetails: any;
  public distance: any

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private dataStorageProvider: DataStorageProvider) {
  }

  getWeatherKeyword(keyword: string) {
    return this.httpClient.get('http://api.openweathermap.org/data/2.5/weather?q=' + keyword + '&units=metric&APPID=ec44e7ff2e0597cf35d85dd13062e22d');
  }

  getCurrentWeatherCoordinates(lat: string, lon: string) {
    return this.httpClient.get('https://api.apixu.com/v1/current.json?key=ef9bc2cafed948a69d6162938181006&q=' + lat + ',' + lon);
  }

  getForecastWeatherCoordinates(lat: string, lon: string, days: string) {
    return this.httpClient.get('https://api.apixu.com/v1/forecast.json?key=ef9bc2cafed948a69d6162938181006&q=' + lat + ',' + lon + '&days=' + days);
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
    return this.httpClient.get('https://agile-springs-70240.herokuapp.com/api/place/').toPromise();
  }

  getPlaceDetails(placeId: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw').toPromise();
  }

  getPlacePhoto(photoreference: string) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  getPhotoString(photoreference: string) {
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoreference + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw';
  }

  getDistanceFromHome(lat: string, lng: string) {
    new Promise(resolve => {
      this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=' + lat + ',' + lng + '&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw')
        .subscribe(data => {
          this.distance = data.json();
          resolve(this.distance);
          return this.distance;
        });
    });

    return this.distance;
  }

  getDistance() {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.2472036,-6.182852100000001&destinations=52.67698000000001,-7.20547&key=AIzaSyCoXe1dZzmHjeIWyxKB2XQlvLdKAZ7WUOw');
  }

  addPlace(place_id, name, visited) {
    console.log("visited " + visited);
    var data = {
      "place_id": place_id,
      "name": name,
      "visited": visited
    };

    this.httpClient.post('https://agile-springs-70240.herokuapp.com/api/place/', data).subscribe(
      value => console.log(value),
      error => console.log(error)
    )
  }

  updatePlace(resource_uri, place_id, name, visited) {
    console.log("updating " + visited);
    var data = {
      "place_id": place_id,
      "name": name,
      "visited": visited
    };

    this.httpClient.put('https://agile-springs-70240.herokuapp.com' + resource_uri, data).subscribe(
      value => console.log(value),
      error => console.log(error)
    )
  }

  removePlace(resource_uri) {
    let link = 'https://agile-springs-70240.herokuapp.com' + resource_uri;
    this.http.delete(link).subscribe(
      value => console.log(value),
      error => console.log(error)
    );
  }
}
